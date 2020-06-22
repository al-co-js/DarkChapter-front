import React from 'react';

const info = () => (
  <>
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
      1. 사진을 올리면 내 안전이 보장되는가 생각하고 올린다
      <br />
      2. 사진을 올리면 우정을 지킬 수 있는가 생각하고 올린다
      <br />
      3. 기숙사 사진은 배경을 알아볼 수 없도록 편집하고 올린다
      <br />
      4. 사진을 지워달라는 요청이 들어오면 바로 지운다
      <br />
      5. 이 사이트의 주 목적은 추억을 저장하는 것이다
      <br />
      6. 위의 사항들이 지켜지지 않을 경우, 개발자에 의해 경고없이 삭제처리 될 수 있다
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

export default info;
