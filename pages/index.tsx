import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChantInfo from '../components/actions/ChantInfo';
import Header from '../components/menus/Header';
import WaterMarkIcon from '../icons/watermark.svg';
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

const WaterMark = styled(WaterMarkIcon)`
  position: fixed;
  width: 186px;
  bottom: 32px;
  left: 50%;
  transform: translate(-50%);
`;

const IndexPage: NextPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<null | string>(null);

  useEffect(() => {
    const handleStart = (route: string) => {
      if (route.startsWith('/chant/')) {
        const id = route.split('/')[2];
        setLoading(id);
      }
    };

    const handleEnd = () => {
      setLoading(null);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleEnd);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleEnd);
    };
  });

  return (
    <Page
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Header />
      <ChantInfoList>
        {Store.getChantItems().map((item) => (
          <ChantInfo
            chantItem={item}
            loading={loading === item.id}
            key={item.id}
          />
        ))}
      </ChantInfoList>
      <Link href="https://izflix.net">
        <WaterMark />
      </Link>
    </Page>
  );
};

export default IndexPage;
