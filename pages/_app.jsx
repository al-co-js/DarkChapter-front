import '../styles/globalStyle.scss';

import Head from 'next/head';
import React from 'react';

import { DetailList } from '../components/DetailList';
import { Loading } from '../components/Loading';
import { Modal as NewModal } from '../components/New/Modal';
import { Modal as OldModal } from '../components/Modal';

const app = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Dark Chapter - 추억을 저장하다</title>
    </Head>
    <Loading />
    <NewModal />
    <OldModal />
    <DetailList />
    <Component {...pageProps} />
  </>
);

export default app;
