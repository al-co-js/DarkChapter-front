import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { render } from 'react-dom';
import { animated, useSpring } from 'react-spring';

import Button from '../Button';
import DetailItem from '../DetailItem';
import { closeLoading, showLoading } from '../Loading';
import { showRegistry } from './Registry';

let showDetail;

const Detail = () => {
  const [back, setBack] = useState(<></>);
  const [detail, setDetail] = useState(<></>);
  const [state, setState] = useState('none');
  const [list, setList] = useState(<></>);
  const router = useRouter();
  const { id } = router.query;

  const closeDetail = () => {
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
    detail.animate(
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

  const close = () => {
    closeDetail();
    Router.push('/profile');
  };

  showDetail = () => {
    const delegate = async () => {
      try {
        showLoading();
        const items = document.getElementsByClassName('detailItems');
        for (let i = items.length - 1; i >= 0; i -= 1) {
          items[i].remove();
        }
        const details = await axios.post(
          'https://darkchapter-back.herokuapp.com/profile/detail/get',
          { id },
        );
        if (!details) {
          closeLoading();
          return;
        }
        const plus = (
          <img
            aria-hidden
            className="registry"
            src="/plus.svg"
            alt="registry"
            onClick={showRegistry}
            onKeyPress={showRegistry}
          />
        );
        const contb = document.createElement('li');
        contb.className = 'detailItems';
        list.appendChild(contb);
        const buff = document.getElementsByClassName('detailItems');
        render(plus, buff[0]);
        details.data.some((data) => {
          const child = (
            <DetailItem
              image={data.image}
              uploader={data.uploader}
              content={data.content}
            />
          );
          const cont = document.createElement('li');
          cont.className = 'detailItems';
          try {
            list.appendChild(cont);
            const conts = document.getElementsByClassName('detailItems');
            render(child, conts[conts.length - 1]);
            return false;
          } catch (err) {
            return true;
          }
        });
      } finally {
        closeLoading();
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
        detail.animate(
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
      }
    };
    delegate();
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
            setDetail(dis);
          }}
          className="detail"
          style={spring}
        >
          <ul
            className="detailList"
            ref={(dis) => {
              setList(dis);
            }}
          />
          <Button
            className="close"
            onClick={close}
          >
            닫기
          </Button>
        </animated.div>
      </div>

      <style jsx>
        {`
          .detailList {
            position: absolute;
            left: 48.5%;
            transform: translateX(-50%);
            top: 23%;
            width: 95%;
            height: 67%;
            overflow-y: scroll;
            list-style: none;
          }
        
          div {
            background-color: #00000066;
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 9999;
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
          .registry {
            position: relative;
            margin-left: 100px;
            cursor: pointer;
          }

          .close {
            position: absolute;
            right: 20px;
            bottom: 20px;
          }

          .detail {
            position: relative;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 3px 6px #00000066;
            z-index: 99999;
            width: 70%;
            height: 130%;
            max-width: 1500px;
            max-height: 1700px;
            top: -80%;
            display: ${state};
            border-radius: 0 0 20px 20px;
            opacity: 0;
            will-change: "transform";
          }
        `}
      </style>
    </>
  );
};

export { Detail, showDetail };
