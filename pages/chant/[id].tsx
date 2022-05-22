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

const CheerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const AdditionalCheerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  row-gap: 16px;

  & > div {
    opacity: 0;
  }
`;

const CheerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  row-gap: 16px;
`;

const CheerLine = styled(motion.div)`
  display: flex;
  font-weight: 800;
  width: 100%;
  justify-content: center;

  @media (max-width: 450px) {
    font-size: 18px;
  }

  @media (min-width: 451px) and (max-width: 810px) {
    font-size: 24px;
  }

  @media (min-width: 811px) {
    font-size: 28px;
  }
`;

const CheerText = styled.div`
  font-weight: 400;
  color: ${Color.WHITE};
  white-space: pre-wrap;
`;

const CheerBlock = styled.div<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? Color.HIGHLIGHT : Color.WHITE)};
  white-space: pre-wrap;
  transition: color 0.05s;
`;

interface IndexedCheerItem {
  index: number;
  item: CheerItem;
}

interface Props {
  id: string;
}

interface State {
  current: number;
  total: number;
  playing: boolean;
  loaded: boolean;
  cheer: IndexedCheerItem[];
  previousCheer: IndexedCheerItem[];
  nextCheer: IndexedCheerItem[];
}

class ChantPage extends Component<Props, State> {
  state: State = {
    current: 0,
    total: 1,
    playing: false,
    loaded: false,
    cheer: [],
    previousCheer: [],
    nextCheer: [],
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
      this.setState({ total: media.duration, loaded: true })
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
    if (!this.state.loaded) {
      this.setState({ cheer: [{ index: -1, item: ['로딩중...'] }] });
      return true;
    }

    const item = Store.get(this.props.id);
    if (!item) return false;

    const gap = item.video_gap;

    const current = this.state.current * 1000 + gap * 1000 + 100;

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

    const result: IndexedCheerItem[] = [];
    const previous: IndexedCheerItem[] = [];
    const next: IndexedCheerItem[] = [];

    if (target === -1) target = 0;

    for (let i = 0; i < timestamps.length; i++) {
      const data = cheer[timestamps[i]];
      if (!data) continue;
      if (i < target) {
        previous.push({ index: i, item: data });
      } else if (i >= target + 3) {
        next.push({ index: i, item: data });
      } else {
        result.push({ index: i, item: data });
      }
    }

    if (previous.length === 0) previous.push({ index: -100, item: [''] });
    if (next.length === 0) previous.push({ index: -200, item: [''] });

    this.setState({ cheer: result, previousCheer: previous, nextCheer: next });
  };

  createCheerLine = (
    indexedItem: IndexedCheerItem,
    current: number,
    effect: boolean,
    strong: boolean = false
  ) => {
    const item = indexedItem.item;
    const index = indexedItem.index;

    const options: any = {
      initial: { opacity: 0 },
      animate: { opacity: strong ? 1 : 0.7 },
      transition: { duration: 0.5, ease: 'easeOut' },
    };

    if (effect) options.animate = 0;

    if (typeof item[0] === 'string') {
      if (item.length === 1)
        return (
          <CheerLine key={index} layoutId={index} {...options}>
            <CheerText>{item[0]}</CheerText>
          </CheerLine>
        );
      return (
        <CheerLine key={index} layoutId={index} {...options}>
          <CheerText>{item[0]}</CheerText>
          {item.slice(1).map((block, innerIndex) => (
            <CheerBlock key={innerIndex} $active={current * 1000 >= block[0]}>
              {block[1]}
            </CheerBlock>
          ))}
        </CheerLine>
      );
    }
    return (
      <CheerLine key={index} layoutId={index} {...options}>
        {item.map((block, innerIndex) => (
          <CheerBlock key={innerIndex} $active={current * 1000 >= block[0]}>
            {block[1]}
          </CheerBlock>
        ))}
      </CheerLine>
    );
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

        <CheerWrapper>
          <AdditionalCheerContent>
            {this.state.previousCheer
              .slice(-1)
              .map((item) => this.createCheerLine(item, current, true))}
          </AdditionalCheerContent>
          <CheerContent>
            {this.state.cheer.map((item, index) =>
              this.createCheerLine(item, current, false, index === 0)
            )}
          </CheerContent>
          <AdditionalCheerContent>
            {this.state.nextCheer
              .slice(0, 1)
              .map((item) => this.createCheerLine(item, current, true))}
          </AdditionalCheerContent>
        </CheerWrapper>

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
