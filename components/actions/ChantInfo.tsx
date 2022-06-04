import Link from 'next/link';
import { Component } from 'react';
import styled from 'styled-components';
import GoIcon from '../../icons/go.svg';
import LoadingIcon from '../../icons/loading.svg';
import { ChantItem } from '../../store/store';
import { Color, MobileQuery, PcQuery } from '../../styles';

const Layout = styled.div`
  display: flex;
  padding: 16px;
  column-gap: 16px;
  align-items: center;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
`;

const Image = styled.img`
  ${MobileQuery} {
    width: 62px;
    height: 62px;
  }

  ${PcQuery} {
    width: 70px;
    height: 70px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  flex-grow: 1;
`;

const Title = styled.div`
  font-weight: 800;
  color: ${Color.WHITE};

  ${MobileQuery} {
    font-size: 20px;
  }

  ${PcQuery} {
    font-size: 24px;
  }
`;

const Description = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;
`;

const DescriptionContent = styled.div`
  font-weight: 400;
  color: ${Color.WHITE};
  opacity: 0.7;

  ${MobileQuery} {
    font-size: 12px;
  }

  ${PcQuery} {
    font-size: 14px;
  }
`;

const DescriptionDot = styled.div`
  width: 2px;
  height: 2px;
  background: ${Color.WHITE};
  opacity: 0.7;
  border-radius: 100%;
`;

const Go = styled(GoIcon)`
  ${MobileQuery} {
    width: 24px;
    height: 24px;
  }

  ${PcQuery} {
    width: 36px;
    height: 36px;
  }
`;

const Loading = styled(LoadingIcon)`
  animation: spin 2s infinite linear;

  ${MobileQuery} {
    width: 24px;
    height: 24px;
  }

  ${PcQuery} {
    width: 36px;
    height: 36px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface Props {
  chantItem: ChantItem;
  loading: boolean;
}

class ChantInfo extends Component<Props> {
  render() {
    const item = this.props.chantItem;
    console.log(item.id);

    return (
      <Link href={`/chant/${item.id}`}>
        <Layout>
          <Image src={item.image} />
          <Content>
            <Title>{item.title}</Title>
            <Description>
              <DescriptionContent>{item.album}</DescriptionContent>
              <DescriptionDot />
              <DescriptionContent>{item.artist}</DescriptionContent>
            </Description>
          </Content>
          {this.props.loading ? <Loading /> : <Go />}
        </Layout>
      </Link>
    );
  }
}

export default ChantInfo;
