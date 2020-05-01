import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

import Button from '../components/Button';
import { showModal } from '../components/Modal';
import Navigation from '../components/Navigation';
import TextBox from '../components/TextBox';
import Tile from '../components/Tile';

const login = () => {
  useEffect(() => {
    Cookies.remove('token');

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

    const links = document.getElementsByClassName('link');
    for (let i = 0; i < 3; i += 1) {
      links[i].href = `/${page[i].link}`;
      links[i].textContent = page[i].name;
    }
  });

  const Login = async () => {
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    if (!(id && password)) {
      showModal('오류', '입력칸을 모두 채워주세요.');
      return;
    }
    try {
      const token = await axios.post('http://localhost:4000/auth/login', { id, password });
      if (!token) {
        showModal('오류', '알 수 없는 에러가 발생했습니다.');
        return;
      }

      Cookies.set('token', token.data, { maxAge: '25200' });
      Router.push('/');
    } catch (err) {
      showModal('오류', err);
    }
  };

  return (
    <>
      <Navigation />
      <Tile className="loginTile">
        <TextBox className="textBox" id="id" placeholder="ID" />
        <TextBox
          className="textBox"
          id="password"
          placeholder="Password"
          type="password"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              Login();
            }
          }}
        />
        <Button id="login" onClick={Login}>Login</Button>
      </Tile>

      <style jsx global>
        {`
          .loginTile {
            position: absolute;
            left: 50%;
            top: 13%;
            transform: translate(-50%);
            width: 90%;
            height: 590px;
            max-width: 610px;
          }

          .textBox {
            position: relative;
            left: 50%;
            transform: translate(-50%);
          }

          #id {
            top: 150px;
          }

          #password {
            top: 200px;
          }

          #login {
            position: relative;
            left: 50%;
            transform: translate(-50%);
            top: 290px;
          }
        `}
      </style>
    </>
  );
};

export default login;
