import React, { useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

import { showModal } from '../../components/Modal';
import Navigation from '../../components/Navigation';
import ProfileList from '../../components/ProfileList';

const profiles = () => {
  useEffect(() => {
    const delegate = async () => {
      const token = Cookies.get('token');
      if (!token) {
        showModal('오류', '로그인이 필요한 작업입니다', () => {
          Router.push('/login');
        });
      }

      try {
        const verified = await axios.post('http://localhost:4000/auth/verify', { token, need: true });
        if (!verified) {
          showModal('오류', '로그인이 필요한 작업입니다', () => {
            Router.push('/login');
          });
        }
        document.getElementById('uploader').textContent = `작성자 : ${verified.data.schoolId} ${verified.data.name}`;
      } catch (err) {
        showModal('오류', '로그인이 필요한 작업입니다', () => {
          Router.push('/login');
        });
      }
    };
    delegate();

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
