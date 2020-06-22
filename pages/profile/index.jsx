import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect } from 'react';

import { showModal } from '../../components/New/Modal';
import ProfileList from '../../components/ProfileList';

const profiles = () => {
  useEffect(() => {
    const delegate = async () => {
      const token = Cookies.get('token');
      if (!token) {
        showModal('로그인이 필요한 작업입니다', 'ok', 'info', () => {
          Router.push('/login');
        });
      }

      try {
        const verified = await axios.post('http://darkchapter-back.herokuapp.com/auth/verify', {
          token,
          need: true,
        });
        if (!verified) {
          showModal('로그인이 필요한 작업입니다', 'ok', 'info', () => {
            Router.push('/login');
          });
        }
      } catch (err) {
        showModal('로그인이 필요한 작업입니다', 'ok', 'info', () => {
          Router.push('/login');
        });
      }
    };
    delegate();
  });

  return (
    <>
      <ProfileList />
    </>
  );
};

export default profiles;
