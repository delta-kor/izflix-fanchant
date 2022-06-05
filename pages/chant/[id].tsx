import axios, { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import styled from 'styled-components';
import Bar from '../../components/actions/Bar';
import CloseIcon from '../../icons/close.svg';
import PauseIcon from '../../icons/pause.svg';
import PlayIcon from '../../icons/play.svg';
import Store, { Attributes, CheerItem, Teleport } from '../../store/store';
import { Color, MobileQuery, PcQuery } from '../../styles';
import NotFoundPage from '../404';

const Page = styled(motion.main)``;

const Audio = styled.audio`
  display: none;
`;

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
  text-align: center;

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

  &.italic {
    font-style: italic;
    opacity: 0.2 !important;
  }
`;

const CheerBlock = styled.div<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? Color.HIGHLIGHT : Color.WHITE)};
  white-space: pre-wrap;
  transition: color 0.07s;
`;

const Close = styled(CloseIcon)`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  ${MobileQuery} {
    width: 24px;
    height: 24px;
    top: 36px;
  }

  ${PcQuery} {
    width: 36px;
    height: 36px;
    top: 48px;
  }
`;

const Teleporter = styled(motion.div)`
  position: fixed;
  left: 50%;
  bottom: 128px;
  transform: translateX(-50%);
  padding: 12px 16px;
  background: ${Color.DARK_GRAY};
  font-size: 14px;
  font-weight: 400;
  color: ${Color.WHITE};
  border-radius: 4px;
  user-select: none;
  cursor: pointer;

  &.large {
    ${PcQuery} {
      bottom: calc(50% - 128px / 2 - 64px);
      font-size: 18px;
    }

    ${MobileQuery} {
      bottom: calc(50% - 128px / 2 - 32px);
      font-size: 14px;
      padding: 8px 12px;
    }

    @media (min-width: 451px) and (max-width: 810px) {
      bottom: calc(50% - 128px / 2 - 52px);
      font-size: 16px;
    }

    font-weight: 800;
    background: ${Color.HIGHLIGHT};
    color: ${Color.WHITE};
  }
`;

interface IndexedCheerItem {
  index: number;
  item: CheerItem;
}

interface Props {
  id: string;
  src: string;
}

interface State {
  current: number;
  total: number;
  playing: boolean;
  loaded: boolean;
  cheer: IndexedCheerItem[];
  previousCheer: IndexedCheerItem[];
  nextCheer: IndexedCheerItem[];
  teleport: Teleport | null;
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
    teleport: null,
  };

  static getInitialProps = async ({ query }) => {
    const id = query.id as string;

    const item = Store.get(id);
    if (!item) throw new AxiosError('페이지를 찾을 수 없어요');

    if (item.audio_only) {
      const src = `https://radio.izflix.net/stream/${id}`;
      return { id, src };
    }

    const url = `https://api.izflix.net/video/${id}?quality=1080&options=private`;
    const response = await axios.get(url, { validateStatus: null });
    const data = response.data;

    if (!data.ok)
      throw new AxiosError(
        data.message ||
          '서버 사용량이 많아 접속이 지연되고 있습니다\n잠시후 다시 시도해주세요'
      );

    const src = data.url;

    return { id, src };
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
    media.src = this.props.src;
    this.mediaInterval = setInterval(() => {
      const current = media.currentTime;
      this.setState({ current });
      this.updateChant();
      this.updateTeleport();
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

    if (previous.length === 0) previous.push({ index: -100, item: [' '] });
    if (next.length === 0) next.push({ index: -200, item: [' '] });

    this.setState({ cheer: result, previousCheer: previous, nextCheer: next });
  };

  updateTeleport = () => {
    const item = Store.get(this.props.id);
    if (!item) return false;

    const current = this.state.current * 1000;

    const teleport = item.teleport;
    if (teleport) {
      for (const data of teleport) {
        if (data.from <= current && data.to >= current) {
          return this.setState({ teleport: data });
        }
      }
    }
    this.setState({ teleport: null });
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
      animate: { opacity: strong ? 1 : 0.55 },
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

    if (item[0] === Attributes.ITALIC) {
      return (
        <CheerLine key={index} layoutId={index} {...options}>
          <CheerText className={'italic'}>{item[1]}</CheerText>
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
        <Head>
          <title>{item.title} 응원법 | FANCHANT</title>
          <meta
            property="og:title"
            content={`${item.title} 응원법 | FANCHANT`}
          />
        </Head>

        {item.audio_only ? (
          <Audio
            //@ts-ignore
            ref={this.mediaRef}
          />
        ) : (
          <Video
            // @ts-ignore
            ref={this.mediaRef}
            playsInline
          />
        )}
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

        <AnimatePresence>
          {this.state.teleport && (
            <Teleporter
              key={this.state.teleport.from.toString()}
              layoutId={this.state.teleport.from.toString()}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className={this.state.teleport.go ? '' : 'large'}
              onClick={() => {
                if (this.state.teleport.go)
                  this.moveTime(this.state.teleport.go / 1000);
              }}
            >
              {this.state.teleport.text}
            </Teleporter>
          )}
        </AnimatePresence>

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

        <Link href="/">
          <Close />
        </Link>
      </Page>
    );
  }
}

export default ChantPage;
