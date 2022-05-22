import { motion } from 'framer-motion';
import Link from 'next/link';
import { Component } from 'react';
import styled from 'styled-components';
import NotFoundIcon from '../icons/not-found.svg';
import { Color, MobileQuery, PcQuery } from '../styles';

const Page = styled(motion.main)``;

const Content = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  ${MobileQuery} {
    margin: 24px 0 0 0;
    font-size: 18px;
  }
  ${PcQuery} {
    margin: 32px 0 0 0;
    font-size: 24px;
  }
`;

const Back = styled.div`
  display: inline-block;
  font-weight: bold;
  background: ${Color.PRIMARY};
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  
  ${MobileQuery} {
    padding: 12px 20px;
    margin: 54px 0 0 0;
    font-size: 14px;
  }
  ${PcQuery} {
    padding: 14px 24px;
    margin: 64px 0 0 0;
    font-size: 16px;
  }
`;

interface Props {
  message: string;
}

class ErrorPage extends Component<Props> {
  static getInitialProps = ({ res, err }) => {
    return {
      message: err.message || '오류가 발생했어요',
    };
  };

  render() {
    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Content>
          <Header>
            <NotFoundIcon />
            <Title>{this.props.message}</Title>
          </Header>
          <Link href={'/'}>
            <Back>메인화면</Back>
          </Link>
        </Content>
      </Page>
    );
  }
}

export default ErrorPage;
