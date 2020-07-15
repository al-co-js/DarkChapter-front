import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';

import Button from './Button';

let showModal;

const Modal = () => {
  const [content, setContent] = useState('');
  const [back, setBack] = useState(<></>);
  const [modal, setModal] = useState(<></>);
  const [state, setState] = useState('none');
  const [type, setType] = useState(<></>);
  const [icon, setIcon] = useState(<></>);
  let callback;

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
        duration: 400,
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
    if (callback instanceof Function) {
      callback('ok');
    }
    closeModal();
  };

  const cancel = () => {
    if (callback instanceof Function) {
      callback('cancel');
    }
    closeModal();
  };

  showModal = (_content, _type, _icon, _callback) => {
    if (_type && _type !== '') {
      if (_type === 'ok') {
        setType(
          <>
            <Button className="ok" onClick={ok}>
              확인
            </Button>
          </>,
        );
      } else {
        setType(
          <>
            <Button className="ok" onClick={ok}>
              확인
            </Button>
            <Button className="cancel" color="orange" onClick={cancel}>
              취소
            </Button>
          </>,
        );
      }
    }
    callback = _callback;
    setContent(_content);
    if (_icon && _icon !== '') {
      if (_icon === 'success') {
        setIcon(
          <div className="svg-box">
            <svg className="circular green-stroke">
              <circle
                className="path"
                cx="75"
                cy="75"
                r="50"
                fill="none"
                strokeWidth="5"
                strokeMiterlimit="10"
              />
            </svg>
            <svg className="checkmark green-stroke">
              <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                <path
                  className="checkmark__check"
                  fill="none"
                  d="M616.306,283.025L634.087,300.805L673.361,261.53"
                />
              </g>
            </svg>
          </div>,
        );
      } else if (_icon === 'error') {
        setIcon(
          <div className="svg-box">
            <svg className="circular red-stroke">
              <circle
                className="path"
                cx="75"
                cy="75"
                r="50"
                fill="none"
                strokeWidth="5"
                strokeMiterlimit="10"
              />
            </svg>
            <svg className="cross red-stroke">
              <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
                <path
                  className="first-line"
                  d="M634.087,300.805L673.361,261.53"
                  fill="none"
                />
              </g>
              <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
                <path
                  className="second-line"
                  d="M634.087,300.805L673.361,261.53"
                />
              </g>
            </svg>
          </div>,
        );
      } else {
        setIcon(
          <div className="svg-box">
            <svg className="circular yellow-stroke">
              <circle
                className="path"
                cx="75"
                cy="75"
                r="50"
                fill="none"
                strokeWidth="5"
                strokeMiterlimit="10"
              />
            </svg>
            <svg className="alert-sign yellow-stroke">
              <g transform="matrix(1,0,0,1,-615.516,-257.346)">
                <g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)">
                  <path
                    className="line"
                    d="M634.087,300.805L673.361,261.53"
                    fill="none"
                  />
                </g>
                <g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)">
                  <circle className="dot" cx="621.52" cy="316.126" r="1.318" />
                </g>
              </g>
            </svg>
          </div>,
        );
      }
    }
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

  const [spring, setSpring] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 5, tension: 500, friction: 80 },
  }));

  return (
    <>
      <div
        ref={(dis) => {
          setBack(dis);
        }}
        onMouseMove={({ clientX: x, clientY: y }) => {
          setSpring({
            x: (x - window.innerWidth / 2) / 65,
            y: (y - window.innerWidth / 2) / 65,
          });
        }}
      >
        <animated.div
          ref={(dis) => {
            setModal(dis);
          }}
          className="modal"
          style={spring}
        >
          {icon}
          <span>{content}</span>
          {type}
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

          span {
            position: absolute;
            left: 50%;
            bottom: 90px;
            font-size: 26px;
            width: 80%;
            text-align: center;
            transform: translate(-50%);
          }
        `}
      </style>

      <style jsx global>
        {`
          .svg-box {
            position: absolute;
            display: inline-block;
            width: 150px;
            left: 50%;
            transform: translate(-50%);
            bottom: 150px;
          }

          .green-stroke {
            stroke: #7cb342;
          }

          .red-stroke {
            stroke: #ff6245;
          }

          .yellow-stroke {
            stroke: #ffc107;
          }

          .circular circle.path {
            stroke-dasharray: 330;
            stroke-dashoffset: 0;
            stroke-linecap: round;
            opacity: 0.4;
            animation: 0.7s draw-circle ease-out;
          }

          .checkmark {
            stroke-width: 6.25;
            stroke-linecap: round;
            position: absolute;
            top: 56px;
            left: 49px;
            width: 52px;
            height: 40px;
          }

          .checkmark path {
            animation: 1s draw-check ease-out;
          }

          @keyframes draw-circle {
            0% {
              stroke-dasharray: 0, 330;
              stroke-dashoffset: 0;
              opacity: 1;
            }

            80% {
              stroke-dasharray: 330, 330;
              stroke-dashoffset: 0;
              opacity: 1;
            }

            100% {
              opacity: 0.4;
            }
          }

          @keyframes draw-check {
            0% {
              stroke-dasharray: 49, 80;
              stroke-dashoffset: 48;
              opacity: 0;
            }

            50% {
              stroke-dasharray: 49, 80;
              stroke-dashoffset: 48;
              opacity: 1;
            }

            100% {
              stroke-dasharray: 130, 80;
              stroke-dashoffset: 48;
            }
          }

          .cross {
            stroke-width: 6.25;
            stroke-linecap: round;
            position: absolute;
            top: 54px;
            left: 54px;
            width: 40px;
            height: 40px;
          }

          .cross .first-line {
            animation: 0.7s draw-first-line ease-out;
          }

          .cross .second-line {
            animation: 0.7s draw-second-line ease-out;
          }

          @keyframes draw-first-line {
            0% {
              stroke-dasharray: 0, 56;
              stroke-dashoffset: 0;
            }

            50% {
              stroke-dasharray: 0, 56;
              stroke-dashoffset: 0;
            }

            100% {
              stroke-dasharray: 56, 330;
              stroke-dashoffset: 0;
            }
          }

          @keyframes draw-second-line {
            0% {
              stroke-dasharray: 0, 55;
              stroke-dashoffset: 1;
            }

            50% {
              stroke-dasharray: 0, 55;
              stroke-dashoffset: 1;
            }

            100% {
              stroke-dasharray: 55, 0;
              stroke-dashoffset: 70;
            }
          }

          .alert-sign {
            stroke-width: 6.25;
            stroke-linecap: round;
            position: absolute;
            top: 40px;
            left: 68px;
            width: 15px;
            height: 70px;
            animation: 0.5s alert-sign-bounce
              cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .alert-sign .dot {
            stroke: none;
            fill: #ffc107;
          }

          @keyframes alert-sign-bounce {
            0% {
              transform: scale(0);
              opacity: 0;
            }

            50% {
              transform: scale(0);
              opacity: 1;
            }

            100% {
              transform: scale(1);
            }
          }

          .ok {
            position: absolute;
            right: 20px;
            bottom: 20px;
          }

          .cancel {
            position: absolute;
            right: 200px;
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
