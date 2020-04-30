import React, { useEffect } from 'react';
import axios from 'axios';
import { Router } from 'next/router';
import Cookies from 'js-cookie';

import Button from '../components/Button';
import Navigation from '../components/Navigation';
import TextBox from '../components/TextBox';
import Tile from '../components/Tile';

const join = () => {
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
      alert('입력칸을 모두 채워주세요.');
      return;
    }
    if (password !== verify) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }
    try {
      await axios.post('http://localhost:4000/auth/join', {
        name, schoolId, id, password,
      });
      Router.push('/login');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Navigation page={page} />
      <Tile className="joinTile">
        <TextBox className="textBox" id="name" placeholder="Name" />
        <TextBox className="textBox" id="schoolId" placeholder="School ID Ex) 2301" />
        <TextBox className="textBox" id="id" placeholder="ID" />
        <TextBox className="textBox" id="password" placeholder="Password" type="password" />
        <TextBox className="textBox" id="verify" placeholder="Verify Password" type="password" />
        <Button id="join" onClick={Join}>Join</Button>
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
            max-width: 610px
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
