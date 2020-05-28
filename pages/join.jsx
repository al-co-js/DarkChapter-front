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

const join = () => {
  useEffect(() => {
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

    const links = document.getElementsByClassName('link');
    for (let i = 0; i < 3; i += 1) {
      links[i].href = `/${page[i].link}`;
      links[i].textContent = page[i].name;
    }
  });

  useEffect(() => {
    Cookies.remove('token');
  });

  const Join = async () => {
    const name = document.getElementById('name').value;
    const schoolId = document.getElementById('schoolId').value;
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    const verify = document.getElementById('verify').value;
    if (!(name && schoolId && id && password && verify)) {
      showModal('오류', '입력칸을 모두 채워주세요');
      return;
    }
    if (password !== verify) {
      showModal('오류', '비밀번호가 일치하지 않습니다');
      return;
    }
    try {
      showLoading();
      await axios.post('http://darkchapter-back.herokuapp.com/auth/join', {
        name,
        schoolId,
        id,
        password,
      });
      hideLoading();
      showModal('성공', '성공적으로 아이디를 생성했습니다', () => {
        Router.push('/login');
      });
    } catch (err) {
      hideLoading();
      if (err.message === 'Network Error') {
        showModal('오류', '서버와 연결에 실패했습니다');
        return;
      }
      let msg;
      switch (err.response.status) {
        case 409:
          msg = '이미 존재하는 아이디입니다';
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
      <Tile className="joinTile">
        <TextBox className="textBox" id="name" placeholder="Name" />
        <TextBox className="textBox" id="schoolId" placeholder="School ID Ex) 2301" />
        <TextBox className="textBox" id="id" placeholder="ID" />
        <TextBox className="textBox" id="password" placeholder="Password" type="password" />
        <TextBox className="textBox" id="verify" placeholder="Verify Password" type="password" />
        <Button id="join" onClick={Join}>
          Join
        </Button>
      </Tile>

      <style jsx global>
        {`
          .joinTile {
            position: absolute;
            left: 50%;
            top: 10%;
            transform: translate(-50%);
            width: 90%;
            height: 750px;
            max-width: 610px;
          }

          .textBox {
            position: relative;
            left: 50%;
            transform: translate(-50%);
          }

          #name {
            top: 120px;
          }

          #schoolId {
            top: 170px;
          }

          #id {
            top: 220px;
          }

          #password {
            top: 270px;
          }

          #verify {
            top: 320px;
          }

          #join {
            position: relative;
            left: 50%;
            transform: translate(-50%);
            top: 410px;
          }
        `}
      </style>
    </>
  );
};

export default join;
