import React from 'react';

import Button from '../components/New/Button';
import { showModal } from '../components/New/Modal';
import Navigation from '../components/New/Navigation';
import TextBox from '../components/New/TextBox';

const test = () => (
  <>
    <Button
      className="bu1"
      onClick={() => showModal('프로필 생성에 성공했습니다', 'ok', 'success', (res) => {
        console.log(res);
      })}
    >
      success
    </Button>
    <Button
      className="bu2"
      onClick={() => showModal(
        '프로필 생성에 실패했습니다. 다시 시도 하시겠습니까?',
        'okcancel',
        'error',
        (res) => {
          console.log(res);
        },
      )}
    >
      error
    </Button>
    <Button
      className="bu3"
      onClick={() => showModal(
        '프로필을 정말로 생성 하시겠습니까?',
        'okcancel',
        'info',
        (res) => {
          console.log(res);
        },
      )}
    >
      info
    </Button>
    <Navigation />
    <TextBox
      className="te"
      placeholder="ID"
      rule={(text) => {
        if (text.length < 6) {
          return { success: false, msg: '아이디가 너무 짧습니다.' };
        }
        return { success: true };
      }}
    />
    a
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    a
    <style jsx global>
      {`
        .bu1 {
          position: absolute;
          left: 25%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .bu2 {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .bu3 {
          position: absolute;
          left: 75%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .te {
          position: absolute;
          left: 30px;
          top: 50px;
        }
      `}
    </style>
  </>
);

export default test;
