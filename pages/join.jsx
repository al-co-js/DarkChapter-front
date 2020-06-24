import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import { hideLoading, Loading, showLoading } from '../components/Loading';
import Button from '../components/New/Button';
import { showModal } from '../components/New/Modal';
import TextBox from '../components/New/TextBox';
import Tile from '../components/Tile';

const join = () => {
  useEffect(() => {
    Cookies.remove('token');
  });

  const [pass, setPass] = useState('');

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
      <Loading />
      <Tile className="joinTile">
        <TextBox
          rule={(text) => {
            if (text.indexOf(' ') >= 0) {
              return { success: false, message: '이름에 공백은 포함될 수 없습니다' };
            }
            return { success: true };
          }}
          className="textBox"
          id="name"
          placeholder="Name"
        />
        <TextBox
          rule={(text) => {
            if (Number(text[0]) === 0
            || Number(text[0]) >= 4
            || Number(text[0]) === 0
            || Number(text[1]) >= 7
            || Number.isNaN(Number(text))
            || text.length !== 4
            ) {
              return { success: false, message: '학번이 잘못되었습니다. 예) 2301' };
            }
            return { success: true };
          }}
          className="textBox"
          id="schoolId"
          placeholder="School ID"
        />
        <TextBox
          rule={(text) => {
            if (text.indexOf(' ') >= 0) {
              return { success: false, message: '아이디에 공백은 포함될 수 없습니다' };
            }
            return { success: true };
          }}
          className="textBox"
          id="id"
          placeholder="ID"
        />
        <TextBox
          rule={(text) => {
            const regex = /^[A-Za-z0-9!@#$%^&+=]{6,15}$/;
            if (!regex.test(text)) {
              return { success: false, message: '영어와 숫자, 특수문자만 사용 및 6글자 이상 15글자 이하' };
            }
            setPass(text);
            return { success: true };
          }}
          className="textBox"
          id="password"
          placeholder="Password"
          type="password"
        />
        <TextBox
          rule={(text) => {
            if (text !== pass) {
              return { success: false, message: '비밀번호가 일치하지 않습니다' };
            }
            return { success: true };
          }}
          className="textBox"
          id="verify"
          placeholder="Verify Password"
          type="password"
        />
        <Button id="joinButton" onClick={Join}>
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
            transform: translate(-25%);
            top: 90px;
            margin-top: 30px;
          }

          #joinButton {
            position: relative;
            left: 50%;
            transform: translate(-50%);
            top: 180px;
          }
        `}
      </style>
    </>
  );
};

export default join;
