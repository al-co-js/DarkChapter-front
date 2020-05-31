import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const Navigation = () => {
  let open = false;
  const [{
    x, y, width, height,
  }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 400,
    height: 300,
  }));

  const hideIndicator = () => {
    const chevrons = document.getElementsByClassName('chevron');
    const indiText = document.getElementsByClassName('indiText');
    indiText[0].style.display = 'none';
    for (let i = 0; i < 3; i += 1) {
      chevrons[i].style.display = 'none';
    }
  };

  const hideIcon = () => {};

  const showInidicator = () => {
    const chevrons = document.getElementsByClassName('chevron');
    const indiText = document.getElementsByClassName('indiText');
    indiText[0].style.display = 'block';
    for (let i = 0; i < 3; i += 1) {
      chevrons[i].style.display = 'block';
    }
  };

  const showIcon = () => {};

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    let buf = my;
    if (my <= 0) {
      buf = my + 100;
    }
    if (!open) {
      set({
        x: down && buf < 250 ? mx / 4 : 0,
        y: down && buf < 250 ? buf : 0,
        width: down && buf < 250 ? buf * 6 : 400,
        height: down && buf < 250 ? buf * 1.5 : 300,
      });
      if (my >= 250) {
        open = true;
        set({
          x: 0,
          y: 250,
          width: 1300,
          height: 325,
        });
        hideIndicator();
      }
    } else {
      set({
        x: down && buf < 250 && buf >= 80 ? mx / 4 : 0,
        y: down && buf < 250 && buf >= 80 ? buf : 250,
        width: 1300,
        height: 325,
      });
      if (buf < 80) {
        open = false;
        set({
          x: 0,
          y: 0,
          width: 400,
          height: 300,
        });
        showInidicator();
      }
    }
  });

  return (
    <>
      <div className="wrapper">
        <animated.div
          className="container"
          onMouseDown={bind().onMouseDown}
          onTouchMove={bind().onTouchMove}
          style={{
            x,
            y,
            width,
            height,
          }}
        >
          <div className="wrapper">
            <div className="indiText">아래로 당기세요</div>
            <div className="chevron" />
            <div className="chevron" />
            <div className="chevron" />
          </div>
          <ul className="naviList" />
        </animated.div>
      </div>

      <style jsx>
        {`
          .wrapper {
            width: 100%;
            height: 100%;
            align-items: center;
            text-align: center;
          }

          .indiText {
            position: absolute;
            text-align: center;
            bottom: 70px;
            width: 100%;
            color: #000000;
            user-select: none;
          }

          .chevron {
            position: absolute;
            left: 49%;
            bottom: 55px;
            width: 28px;
            height: 8px;
            opacity: 0;
            transform: scale3d(0.5, 0.5, 0.5) translateX(-50%);
            animation: move 3s ease-out infinite;
          }

          .chevron:first-child {
            animation: move 3s ease-out 1s infinite;
          }

          .chevron:nth-child(2) {
            animation: move 3s ease-out 2s infinite;
          }

          .chevron:before,
          .chevron:after {
            content: ' ';
            position: absolute;
            top: 0;
            height: 100%;
            width: 50%;
            background: #000000;
          }

          .chevron:before {
            left: 0;
            transform: skew(0deg, 30deg);
          }

          .chevron:after {
            right: 0;
            width: 50%;
            transform: skew(0deg, -30deg);
          }

          @keyframes move {
            25% {
              opacity: 1;
            }
            33% {
              opacity: 1;
              transform: translate(-25%, 30px);
            }
            67% {
              opacity: 1;
              transform: translate(-25%, 40px);
            }
            100% {
              opacity: 0;
              transform: translate(-25%, 55px) scale3d(0.5, 0.5, 0.5);
            }
          }

          @keyframes pulse {
            to {
              opacity: 1;
            }
          }
        `}
      </style>

      <style jsx global>
        {`
          .container {
            position: relative;
            margin: 0 auto;
            margin-top: -250px;
            border-radius: 0 0 20px 20px;
            background-color: #ffffff;
            width: 400px;
            height: 300px;
            min-width: 400px;
            min-height: 300px;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};

export default Navigation;
