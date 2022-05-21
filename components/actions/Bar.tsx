import React, { Component, MouseEvent, TouchEvent } from 'react';
import styled from 'styled-components';
import { Color } from '../../styles';
import { getDuration } from '../../time';

const Layout = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  left: 24px;
  right: 24px;
  bottom: 76px;
`;

const Timer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Time = styled.div`
  font-weight: 700;
  font-size: 12px;
  color: ${Color.WHITE};
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
`;

const BackBar = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: ${({ $active }) => ($active ? '10px' : '4px')};
  background: ${Color.WHITE}4D;
  border-radius: 12px;
  transition: height 0.2s;
`;

const Indicator = styled.div<{ $active: boolean }>`
  position: relative;
  height: 100%;
  border-radius: ${({ $active }) => ($active ? '8px 0 0 8px' : '100px')};
  background: ${Color.WHITE};

  ::after {
    position: absolute;
    content: '';
    width: 10px;
    height: 10px;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
    background: ${Color.WHITE};
    border-radius: 100%;
  }
`;

interface Props {
  current: number;
  total: number;
  move(time: number): void;
}

interface State {
  active: boolean;
  down: boolean;
}

class Bar extends Component<Props, State> {
  state: State = {
    active: false,
    down: false,
  };

  barRef = React.createRef<HTMLDivElement>();

  followCursor = (x: number) => {
    const bar = this.barRef!.current;
    const rect = bar.getBoundingClientRect();
    const left = rect.left;
    const relativeX = x - left;
    const ratio = relativeX / rect.width;
    this.props.move(this.props.total * ratio);
  };

  onMouseDown = (e: MouseEvent | TouchEvent) => {
    this.setState({ down: true });

    // @ts-ignore
    if (e.clientX) {
      e.preventDefault();
      // @ts-ignore
      this.followCursor(e.clientX);
      document.addEventListener('mouseup', this.onMouseUp, { once: true });
      document.addEventListener('mousemove', this.onMouseMove);
    } else {
      // @ts-ignore
      this.followCursor(e.changedTouches[0].clientX);
      document.addEventListener('touchend', this.onMouseUp, { once: true });
      document.addEventListener('touchmove', this.onMouseMove);
    }
  };

  onMouseMove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
    if (e instanceof globalThis.MouseEvent) this.followCursor(e.clientX);
    if (e instanceof globalThis.TouchEvent)
      this.followCursor(e.changedTouches[0].clientX);
  };

  onMouseUp = () => {
    this.setState({ down: false });
    document.removeEventListener('mousemove', this.onMouseMove);
  };

  render() {
    return (
      <Layout
        onMouseEnter={() => this.setState({ active: true })}
        onMouseLeave={() => this.setState({ active: false })}
        onTouchStart={this.onMouseDown}
        onMouseDown={this.onMouseDown}
      >
        <Timer>
          <Time>{getDuration(this.props.current)}</Time>
          <Time>{getDuration(this.props.total)}</Time>
        </Timer>
        <Content>
          <BackBar
            $active={this.state.active || this.state.down}
            ref={this.barRef}
          >
            <Indicator
              style={{
                width: (this.props.current / this.props.total) * 100 + '%',
              }}
              $active={this.state.active || this.state.down}
            />
          </BackBar>
        </Content>
      </Layout>
    );
  }
}

export default Bar;
