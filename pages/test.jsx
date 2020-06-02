import React from 'react';

import Button from '../components/New/Button';
import { showModal } from '../components/New/Modal';
import Navigation from '../components/New/Navigation';
import TextBox from '../components/New/TextBox';

const test = () => (
  <>
    <Button className="bu" onClick={() => showModal('o', 'a')}>
      Button
    </Button>
    <Navigation />
    <TextBox className="te" placeholder="ID" />

    <style jsx global>
      {`
        .bu {
          position: absolute;
          left: 50%;
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
