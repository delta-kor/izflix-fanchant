import { Component } from 'react';
import styled from 'styled-components';
import LogoIcon from '../../icons/logo.svg';
import { Color, MobileQuery, PcQuery } from '../../styles';

const Layout = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  user-select: none;
  z-index: 10;
  border-bottom: 1px solid transparent;

  ${MobileQuery} {
    height: 80px;
    padding: 0 32px;
    column-gap: 24px;
  }

  ${PcQuery} {
    height: 96px;
    column-gap: 32px;
    justify-content: center;
  }
`;

const Icon = styled(LogoIcon)`
  ${MobileQuery} {
    width: 22px;
    height: 30px;
  }

  ${PcQuery} {
    width: 28px;
    height: 30px;
  }
`;

const Text = styled.div`
  color: ${Color.WHITE};
  font-weight: 800;

  ${MobileQuery} {
    font-size: 20px;
  }

  ${PcQuery} {
    font-size: 28px;
  }
`;

class Header extends Component {
  render() {
    return (
      <Layout>
        <Icon />
        <Text>FANCHANT</Text>
      </Layout>
    );
  }
}

export default Header;
