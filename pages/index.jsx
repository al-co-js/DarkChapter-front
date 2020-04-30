import React from 'react';
import Cookies from 'js-cookie';

import Navigation from '../components/Navigation';

const main = () => {
  const page = Cookies.get('token')
    ? [
      {
        name: 'Logout',
        link: 'logout',
      },
      {
        name: 'Profiles',
        link: 'profiles',
      },
      {
        name: 'About',
        link: 'about',
      },
    ]
    : [
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
