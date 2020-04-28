import React from 'react';

import Navigation from '../components/Navigation';

const login = () => {
  const page = [
    {
      name: 'Main',
      link: '',
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

export default login;
