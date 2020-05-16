import React from 'react';
import Head from 'next/head';
import { Modal } from '../components/Modal';
import { DetailList } from '../components/DetailList';
import { Loading } from '../components/Loading';

import '../styles/globalStyle.scss';

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
