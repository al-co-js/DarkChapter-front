import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

import Navigation from '../components/Navigation';
import ProfileRank from '../components/ProfileRank';

const main = () => {
  useEffect(() => {
    const isLogged = Cookies.get('token');
    const page = isLogged
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
          name: 'Info',
          link: 'info',
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
          name: 'Info',
          link: 'info',
        },
      ];
    const links = document.getElementsByClassName('link');
    for (let i = 0; i < 3; i += 1) {
      links[i].href = `/${page[i].link}`;
      links[i].textContent = page[i].name;
    }
    const moreLink = document.getElementById('moreLink');
    moreLink.href = isLogged ? '/profiles' : '/login';
    const more = moreLink.children[0];
    more.src = isLogged ? '/plus.svg' : '/dotdotdot.svg';
    more.alt = isLogged ? 'plus' : 'dotdotdot';
    more.id = isLogged ? 'plus' : 'dotdotdot';
  });

  return (
    <>
      <Navigation />
      <ProfileRank />
    </>
  );
};

export default main;
