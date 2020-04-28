import React from 'react';

import Navigation from '../components/Navigation';
import ProfileList from '../components/ProfileList';

const profiles = () => {
  const page = [
    {
      name: 'Logout',
      link: 'logout',
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
      <ProfileList />
    </>
  );
};

export default profiles;
