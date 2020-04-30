import React, { useEffect } from 'react';

import Navigation from '../components/Navigation';
import ProfileList from '../components/ProfileList';

const profiles = () => {
  useEffect(() => {
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

    const links = document.getElementsByClassName('link');
    for (let i = 0; i < 3; i += 1) {
      links[i].href = `/${page[i].link}`;
      links[i].textContent = page[i].name;
    }
  });

  return (
    <>
      <Navigation />
      <ProfileList />
    </>
  );
};

export default profiles;
