import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import { hideLoading, Loading, showLoading } from '../components/Loading';
import Button from '../components/New/Button';
import { showModal } from '../components/New/Modal';
import TextBox from '../components/New/TextBox';
import Tile from '../components/Tile';

const login = () => {
  useEffect(() => {
    Cookies.remove('token');
  }, []);

  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const Login = async () => {
    if (!(id.value && password.value)) {
      showModal('입력칸을 모두 채워주세요', 'ok', 'info');
      return;
    }
    try {
      showLoading();
      const token = await axios.post('http://darkchapter-back.herokuapp.com/auth/login',
        { id: id.value, password: password.value });
      if (!token) {
        hideLoading();
        showModal('알 수 없는 오류가 발생했습니다', 'ok', 'error');
        return;
      }

      hideLoading();
      Cookies.set('token', token.data, { maxAge: '25200' });
      Router.push('/profile');
    } catch (err) {
      hideLoading();
      if (err.message === 'Network Error') {
        showModal('서버와 연결에 실패했습니다', 'ok', 'error');
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
      showModal(msg, 'ok', 'error');
    }
  };

  return (
    <>
      <Loading />
      <Tile className="loginTile">
        <TextBox
          className="textBox"
          id="id"
          placeholder="ID"
          setText={setId}
        />
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
          setText={setPassword}
        />
        <Button id="loginButton" onClick={Login}>Login</Button>
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
            transform: translate(-25%);
          }

          #id {
            top: 150px;
          }

          #password {
            top: 200px;
          }

          #loginButton {
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
