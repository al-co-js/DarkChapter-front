import React from 'react';

import Button from '../components/New/Button';
import { showModal } from '../components/New/Modal';
import Navigation from '../components/New/Navigation';
import TextBox from '../components/New/TextBox';

const test = () => (
  <>
    <Button className="bu1" onClick={() => showModal('프로필 생성에 성공했습니다', 'ok', 'success')}>
      ok
    </Button>
    <Button className="bu2" onClick={() => showModal('프로필 생성에 성공했습니다', 'okcancel', 'success')}>
      ok cancel
    </Button>
    <Navigation />
    <TextBox className="te" placeholder="ID" />

    <style jsx global>
      {`
        .bu1 {
          position: absolute;
          left: 40%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .bu2 {
          position: absolute;
          left: 60%;
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
