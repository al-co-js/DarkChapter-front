import React from 'react';

import Navigation from '../components/Navigation';

const join = () => {
  const page = [
    {
      name: 'Login',
      link: 'login',
    },
    {
      name: 'Main',
      link: '',
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

export default join;
