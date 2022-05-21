import { motion } from 'framer-motion';
import React, { Component } from 'react';
import styled from 'styled-components';
import Bar from '../../components/actions/Bar';
import PauseIcon from '../../icons/pause.svg';
import PlayIcon from '../../icons/play.svg';
import Store, { CheerItem } from '../../store/store';
import { Color } from '../../styles';
import NotFoundPage from '../404';

const Page = styled(motion.main)``;

const Video = styled.video`
  position: fixed;
  min-height: 100%;
  min-width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${Color.BACKGROUND};
  opacity: 0.7;
`;

const Play = styled(PlayIcon)`
  position: fixed;
  width: 24px;
  height: 24px;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const Pause = styled(PauseIcon)`
  position: fixed;
  width: 24px;
  height: 24px;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const CheerContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  row-gap: 16px;
`;

const CheerLine = styled.div`
  display: flex;
  column-gap: 6px;
  font-weight: 800;

  @media (max-width: 450px) {
    font-size: 18px;
  }

  @media (min-width: 451px) and (max-width: 810px) {
    font-size: 24px;
  }

  @media (min-width: 811px) {
    font-size: 28px;
  }

  :not(:first-of-type) {
    opacity: 0.7;
  }
`;

const CheerText = styled.div`
  font-weight: 400;
  color: ${Color.WHITE};
`;

const CheerBlock = styled.div<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? Color.PRIMARY : Color.WHITE)};
`;

interface Props {
  id: string;
}

interface State {
  current: number;
  total: number;
  playing: boolean;
  cheer: CheerItem[];
}

class ChantPage extends Component<Props, State> {
  state: State = {
    current: 0,
    total: 1,
    playing: false,
    cheer: [],
  };

  static getInitialProps = ({ query }) => {
    const id = query.id as string;
    return { id };
  };

  mediaRef = React.createRef<HTMLVideoElement | HTMLAudioElement>();
  mediaInterval: any;

  componentDidMount = () => {
    const media = this.mediaRef!.current;
    media.addEventListener('play', () => this.setState({ playing: true }));
    media.addEventListener('pause', () => this.setState({ playing: false }));
    media.addEventListener('loadedmetadata', () =>
      this.setState({ total: media.duration })
    );
    this.mediaInterval = setInterval(() => {
      this.setState({ current: media.currentTime });
      this.updateChant();
    }, 10);
  };

  componentWillUnmount = () => {
    clearInterval(this.mediaInterval);
  };

  togglePlayer = () => {
    const media = this.mediaRef!.current;
    const current = this.state.playing;
    if (current) media.pause();
    else media.play();
  };

  moveTime = (time: number) => {
    const media = this.mediaRef!.current;
    media.currentTime = time;
  };

  updateChant = () => {
    const item = Store.get(this.props.id);
    if (!item) return false;

    const gap = item.video_gap;

    const current = this.state.current * 1000 + gap * 1000;

    const cheer = item.cheer;
    const timestamps = Object.keys(cheer).map(Number);

    let target = timestamps.length - 1;

    for (const timestamp of timestamps) {
      if (current < timestamp) {
        const index = timestamps.indexOf(timestamp);
        target = index - 1;
        break;
      }
    }

    const cheerA = cheer[timestamps[target]];
    const cheerB = cheer[timestamps[target + 1]];
    const cheerC = cheer[timestamps[target + 2]];
    const cheerD = cheer[timestamps[target + 3]];

    const result = [];
    cheerA && result.push(cheerA);
    cheerB && result.push(cheerB);
    cheerC && result.push(cheerC);

    if (!cheerA) result.push(cheerD);

    this.setState({ cheer: result });
  };

  render() {
    const item = Store.get(this.props.id);
    if (!item) {
      return <NotFoundPage />;
    }

    const gap = item.video_gap;
    const current = this.state.current + gap;

    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Video
          src={'https://v.iz-cdn.kro.kr/video/712332696'}
          // @ts-ignore
          ref={this.mediaRef}
          playsInline
        />
        <Cover />

        <CheerContent>
          {this.state.cheer.map((item, index) => {
            if (typeof item[0] === 'string') {
              if (item.length === 1)
                return (
                  <CheerLine key={index}>
                    <CheerText>{item[0]}</CheerText>
                  </CheerLine>
                );
              return (
                <CheerLine key={index}>
                  <CheerText>{item[0]}</CheerText>
                  {item.slice(1).map((block, innerIndex) => (
                    <CheerBlock
                      key={innerIndex}
                      $active={current * 1000 >= block[0]}
                    >
                      {block[1]}
                    </CheerBlock>
                  ))}
                </CheerLine>
              );
            }
            return (
              <CheerLine key={index}>
                {item.map((block, innerIndex) => (
                  <CheerBlock
                    key={innerIndex}
                    $active={current * 1000 >= block[0]}
                  >
                    {block[1]}
                  </CheerBlock>
                ))}
              </CheerLine>
            );
          })}
        </CheerContent>

        <Bar
          current={this.state.current}
          total={this.state.total}
          point={item.point}
          move={this.moveTime}
        />

        {this.state.playing ? (
          <Pause onClick={this.togglePlayer} />
        ) : (
          <Play onClick={this.togglePlayer} />
        )}
      </Page>
    );
  }
}

export default ChantPage;
