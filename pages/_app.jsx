import '../styles/globalStyle.scss';

import { PageTransition } from 'next-page-transitions';
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
    <PageTransition timeout={300} classNames="page-transition">
      <Component {...pageProps} />
    </PageTransition>

    <style jsx global>
      {`
        .page-transition-enter {
          opacity: 0;
        }

        .page-transition-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }

        .page-transition-exit {
          opacity: 1;
        }

        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}
    </style>
  </>
);

export default app;
