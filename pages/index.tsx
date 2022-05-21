import { motion } from 'framer-motion';
import { NextPage } from 'next';
import styled from 'styled-components';
import ChantInfo from '../components/actions/ChantInfo';
import Header from '../components/menus/Header';
import Store from '../store/store';
import { MobileQuery, PcQuery } from '../styles';

const Page = styled(motion.main)``;

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
    <Page
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Header />
      <ChantInfoList>
        {Store.getChantItems().map((item) => (
          <ChantInfo chantItem={item} key={item.id} />
        ))}
      </ChantInfoList>
    </Page>
  );
};

export default IndexPage;
