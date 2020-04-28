import React from 'react';

import Button from '../components/Button';
import Navigation from '../components/Navigation';
import TextBox from '../components/TextBox';
import Tile from '../components/Tile';

const login = () => {
  const page = [
    {
      name: 'Main',
      link: '',
    },
    {
      name: 'Join',
      link: 'join',
    },
    {
      name: 'About',
      link: 'about',
    },
  ];

  return (
    <>
      <Navigation page={page} />
      <Tile className="loginTile">
        <TextBox className="textBox" id="id" placeholder="ID" />
        <TextBox className="textBox" id="password" placeholder="Password" type="password" />
        <Button id="login">Login</Button>
      </Tile>

      <style jsx global>
        {`
          .loginTile {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 610px;
            height: 590px;
          }

          .textBox {
            position: relative;
            left: 50%;
            transform: translate(-50%);
          }

          #id {
            top: 150px;
          }

          #password {
            top: 200px;
          }

          #login {
            position: relative;
            left: 50%;
            transform: translate(-50%);
            top: 290px;
          }
        `}
      </style>
    </>
  );
};

export default login;
