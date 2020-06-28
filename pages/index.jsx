import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '../components/New/Button';

const main = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(Cookies.get('token'));
    if (token) {
      Router.push('/profile');
    }
  });

  return (
    <>
      <span className="wave" id="text">
        <span id="orangeText">D</span>
        ark
        {' '}
        <span id="blueText">C</span>
        hapter
        <br />
        <span id="subTitle">
          흑역사를 추억하다
        </span>
      </span>
      <span className="guid pro">
        이미 회원이신가요?
        <br />
        로그인을 해보세요!
      </span>
      <Button
        className="button pro"
        onClick={() => {
          Router.push('/login');
        }}
      >
        Login
      </Button>
      <span className="guid info">
        이 사이트가 궁금하신가요?
        <br />
        설명해드릴게요!
      </span>
      <Button
        className="button info"
        onClick={() => {
          Router.push('/info');
        }}
      >
        Info
      </Button>
      <span className="guid newbie">
        이 사이트가 처음이신가요?
        <br />
        회원가입을 해보세요!
      </span>
      <Button
        className="button newbie"
        onClick={() => {
          Router.push('/join');
        }}
      >
        Join
      </Button>
      <img
        className="wave"
        id="blue"
        alt="blue wave"
        src="/blueWave.svg"
      />
      <img
        className="wave"
        id="orange"
        alt="orange wave"
        src="/orangeWave.svg"
      />

      <style jsx>
        {`
          @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);

          #subTitle {
            font-family: "Noto Sans KR";
            font-weight: lighter;
            font-size: 68px;
          }
        
          .guid {
            position: absolute;
            font-size: 30px;
            top: 55%;
            opacity: 0;
            transform: translate(-50%, -80%);
            text-align: center;
          }

          .wave {
            position: absolute;
            opacity: 0;
            animation: wave 0.5s ease-out 4.9s both;
          }

          #blue {
            top: 0;
            right: 0;
          }

          #orange {
            left: 0;
            bottom: 0;
          }

          #text {
            left: 6%;
            top: 10%;
            font-size: 56px;
          }

          #orangeText {
            color: #f2811d;
          }

          #blueText {
            color: #1ba0f2;
          }

            @keyframes wave {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>

      <style jsx global>
        {`
          .button {
            position: absolute;
            top: 65%;
            opacity: 0;
            transform: translate(-50%, -80%);
          }

          .newbie {
            left: 75%;
            animation: guid 0.5s ease-out 3.6s both;
          }

          .pro {
            left: 25%;
            animation: guid 0.5s ease-out 1s both;
          }

          .info {
            left: 50%;
            animation: guid 0.5s ease-out 2.3s both;
          }

          @keyframes guid {
            0% {
              opacity: 0;
              transform: translate(-50%, -80%);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }
        `}
      </style>
    </>
  );
};

export default main;
