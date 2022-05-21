import { NextPage } from 'next';
import styled from 'styled-components';
import ChantInfo from '../components/actions/ChantInfo';
import Header from '../components/menus/Header';
import Store from '../store/store';
import { MobileQuery, PcQuery } from '../styles';

const ChantInfoList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  ${MobileQuery} {
    padding: 0 32px;
  }

  ${PcQuery} {
    margin: 0 auto;
    max-width: 540px;
  }
`;

const IndexPage: NextPage = () => {
  return (
    <>
      <Header />
      <ChantInfoList>
        {Store.getChantItems().map((item) => (
          <ChantInfo chantItem={item} />
        ))}
      </ChantInfoList>
    </>
  );
};

export default IndexPage;
