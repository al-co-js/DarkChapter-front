import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import Navigation from '../components/Navigation';

const about = () => {
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
          name: 'Main',
          link: '',
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
          name: 'Main',
          link: '',
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
      <div className="title" id="whatT">
        WHAT?
      </div>
      <div className="detail" id="whatD">
        이 사이트는 추억을 저장하고, 흑역사를 기억하는 사이트입니다
        <br />
        누구든지 프로필을 볼 수 있고, 내용을 변경할 수 있습니다
        <br />
        단, 아래의 규칙을 모두 읽고 선을 넘지 않게 조심해주세요
      </div>
      <div className="title" id="ruleT">
        RULE
      </div>
      <div className="detail" id="whatD">
        1. 사진을 올릴 때 현피를 하지는 않을까 생각하고 올린다
        <br />
        2. 사진을 올리면 우정을 지킬 수 있는가 생각하고 올린다
        <br />
        3. 사진을 올리면 내 안전이 보장되는가 생각하고 올린다
        <br />
        4. 본인이 사진을 지우라고 요청하면 바로 지운다
        <br />
        5. 다른 사람을 엿맥이는 것이 아닌 우정을 지키기 위해서만 사진을 올린다
        <br />
        6. 이 사이트의 주 목적은 추억을 저장하는 것이다
      </div>

      <style jsx>
        {`
          .title {
            position: relative;
            font-size: 55px;
            top: 150px;
            left: 90px;
            width: 80%;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          .detail {
            position: relative;
            font-size: 25px;
            top: 150px;
            left: 130px;
            margin-top: 30px;
            width: 80%;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          #ruleT {
            margin-top: 80px;
          }
        `}
      </style>
    </>
  );
};

export default about;
