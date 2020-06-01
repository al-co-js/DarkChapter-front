import React from 'react';

import Button from '../components/New/Button';

const test = () => (
  <>
    <Button className="bu">
      Button
    </Button>

    <style jsx global>
      {`
        .bu {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}
    </style>
  </>
);

export default test;
