import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect } from 'react';

import Button from '../components/Button';
import { hideLoading, showLoading } from '../components/Loading';
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
      showModal('오류', '입력칸을 모두 채워주세요');
      return;
    }
    try {
      showLoading();
      const token = await axios.post('http://darkchapter-back.herokuapp.com/auth/login', { id, password });
      if (!token) {
        hideLoading();
        showModal('오류', '알 수 없는 에러가 발생했습니다');
        return;
      }

      hideLoading();
      Cookies.set('token', token.data, { maxAge: '25200' });
      Router.push('/');
    } catch (err) {
      hideLoading();
      if (err.message === 'Network Error') {
        showModal('오류', '서버와 연결에 실패했습니다');
        return;
      }
      let msg;
      switch (err.response.status) {
        case 401:
          msg = '비밀번호가 틀렸습니다';
          break;
        case 404:
          msg = '아이디가 존재하지 않습니다';
          break;
        case 412:
          msg = '서버에 데이터가 제대로 전달되지 못했습니다';
          break;
        case 500:
          msg = '서버에서 에러가 발생했습니다';
          break;
        default:
          msg = '알 수 없는 에러가 발생했습니다';
          break;
      }
      showModal('오류', msg);
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
