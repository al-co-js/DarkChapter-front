import '../styles/globalStyle.scss';

import { PageTransition } from 'next-page-transitions';
import Head from 'next/head';
import React from 'react';

import { Modal } from '../components/New/Modal';
import Navigation from '../components/New/Navigation';

const app = ({ Component, pageProps, router }) => (
  <>
    <Head>
      <title>Dark Chapter - 추억을 저장하다</title>
    </Head>
    <Modal />
    <Navigation />
    <PageTransition timeout={300} classNames="page-transition">
      <Component {...pageProps} key={router.route} />
    </PageTransition>

    <style jsx global>
      {`
        .page-transition-enter {
          opacity: 0;
        }

        .page-transition-enter-active {
          opacity: 1;
          transition: opacity 0.3s;
        }

        .page-transition-exit {
          opacity: 1;
        }

        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 0.3s;
        }
      `}
    </style>
  </>
);

export default app;
