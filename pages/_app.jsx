import React from 'react';
import Head from 'next/head';
import { Modal } from '../components/Modal';

import '../styles/globalStyle.scss';

const app = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Dark Chapter - 추억을 저장하다</title>
    </Head>
    <Modal />
    <Component {...pageProps} />
  </>
);

export default app;
