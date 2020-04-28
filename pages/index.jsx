import React from 'react';

import Navigation from '../components/Navigation';

const main = () => {
  const page = [
    {
      name: 'Login',
      link: 'login',
    },
    {
      name: 'Join',
      link: 'join',
    },
    {
      name: 'About',
      link: 'about',
    },
  ];

  return (
    <>
      <Navigation page={page} />
    </>
  );
};

export default main;
