import '../styles/globalStyle.scss';

import Head from 'next/head';
import React from 'react';

import { DetailList } from '../components/DetailList';
import { Modal as OldModal } from '../components/Modal';
import { Modal as NewModal } from '../components/New/Modal';
import Navigation from '../components/New/Navigation';

const app = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Dark Chapter - 추억을 저장하다</title>
    </Head>
    <NewModal />
    <OldModal />
    <DetailList />
    <Navigation />
    <Component {...pageProps} />
  </>
);

export default app;
