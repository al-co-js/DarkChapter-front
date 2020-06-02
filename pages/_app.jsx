import '../styles/globalStyle.scss';

import Head from 'next/head';
import React from 'react';

import { DetailList } from '../components/DetailList';
import { Loading } from '../components/Loading';
import { Modal } from '../components/New/Modal';

const app = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Dark Chapter - 추억을 저장하다</title>
    </Head>
    <Loading />
    <Modal />
    <DetailList />
    <Component {...pageProps} />
  </>
);

export default app;
