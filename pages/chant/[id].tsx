import { motion } from 'framer-motion';
import React, { Component } from 'react';
import styled from 'styled-components';
import PauseIcon from '../../icons/pause.svg';
import PlayIcon from '../../icons/play.svg';
import Store from '../../store/store';
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
`;

const Pause = styled(PauseIcon)`
  position: fixed;
  width: 24px;
  height: 24px;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
`;

interface Props {
  id: string;
}

interface State {
  current: number;
  playing: boolean;
}

class ChantPage extends Component<Props, State> {
  state: State = {
    current: 0,
    playing: false,
  };

  static getInitialProps = ({ query }) => {
    const id = query.id as string;
    return { id };
  };

  mediaRef = React.createRef<HTMLVideoElement | HTMLAudioElement>();
  mediaInterval: any;

  componentDidMount = () => {
    const media = this.mediaRef!.current;
    this.mediaInterval = setInterval(() => {
      this.setState({ current: media.currentTime });
    }, 10);
    media.addEventListener('play', () => this.setState({ playing: true }));
    media.addEventListener('pause', () => this.setState({ playing: false }));
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

  render() {
    const item = Store.get(this.props.id);
    if (!item) {
      return <NotFoundPage />;
    }

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
