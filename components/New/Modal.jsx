import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';

import Button from './Button';

let showModal;

const Modal = () => {
  const [content, setContent] = useState('');
  const [back, setBack] = useState(<></>);
  const [modal, setModal] = useState(<></>);
  const [state, setState] = useState('none');
  const [type, setType] = useState('ok');

  showModal = (_content, _type) => {
    if (_type && _type !== '') {
      setType(_type);
    }
    setContent(_content);
    setState('block');
    back.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      {
        easing: 'ease',
        duration: 400,
        fill: 'both',
      },
    );
    modal.animate(
      [
        {
          opacity: 0,
          top: '-80%',
        },
        {
          opacity: 1,
          top: '-30%',
        },
      ],
      {
        easing: 'ease',
        duration: 400,
        fill: 'both',
      },
    );
  };

  const closeModal = () => {
    back.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      {
        easing: 'ease',
        duration: 500,
        fill: 'both',
      },
    );
    modal.animate(
      [
        {
          opacity: 1,
          top: '-30%',
        },
        {
          opacity: 0,
          top: '-80%',
        },
      ],
      {
        easing: 'ease',
        duration: 400,
        fill: 'both',
      },
    );
    setTimeout(() => setState('none'), 400);
  };

  const ok = () => {
    closeModal();
  };

  const cancel = () => {
    closeModal();
  };

  const buttonType = () => {
    if (type === 'ok') {
      return (
        <>
          <Button className="ok" onClick={() => ok()}>
            확인
          </Button>
        </>
      );
    }
    return (
      <>
        <Button className="ok" onClick={() => ok()}>
          확인
        </Button>
        <Button className="cancel" color="orange" onClick={() => cancel()}>
          취소
        </Button>
      </>
    );
  };

  const [spring, setSpring] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 400, friction: 60 },
  }));

  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];

  const trans = (x, y) => `
    translate3d(${x / 10}px, ${y / 10}px, 0)
  `;

  return (
    <>
      <div
        ref={(dis) => {
          setBack(dis);
        }}
        onMouseMove={({ clientX: x, clientY: y }) => {
          setSpring({ xy: calc(x, y) });
        }}
      >
        <animated.div
          ref={(dis) => {
            setModal(dis);
          }}
          className="modal"
          style={{
            transform: spring.xy.interpolate(trans),
          }}
        >
          <span>{content}</span>
          {buttonType()}
        </animated.div>
      </div>

      <style jsx>
        {`
          div {
            background-color: #00000066;
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 99999;
            opacity: 0;
            display: ${state};
          }
        `}
      </style>

      <style jsx global>
        {`
          ${type === 'ok'
          ? `.ok {
            position: absolute;
            right: 20px;
            bottom: 20px;
          }`
          : `.ok {
            position: absolute;
            right: 200px;
            bottom: 20px;
          }`}

          .cancel {
            position: absolute;
            right: 20px;
            bottom: 20px;
          }

          .modal {
            position: relative;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 3px 6px #00000066;
            z-index: 99999;
            width: 70%;
            height: 100%;
            max-width: 700px;
            max-height: 600px;
            top: -80%;
            display: ${state};
            border-radius: 0 0 20px 20px;
            opacity: 0;
            will-change: 'transform';
          }
        `}
      </style>
    </>
  );
};

export { Modal, showModal };
