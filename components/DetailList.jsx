import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import { render } from 'react-dom';

import Detail from './Detail';
import { hideLoading, showLoading } from './Loading';

let showDetail;

const DetailList = () => {
  const [status, setStatus] = useState('none');
  const [registry, setRegistry] = useState({ method: () => {} });

  showDetail = (_id) => {
    setRegistry({
      method: () => {
        setStatus('none');
        Router.push({
          pathname: '/profiles/detail',
          query: { id: _id },
        });
      },
    });
    const delegate = async () => {
      showLoading();
      try {
        const details = await axios.post(
          'http://darkchapter-back.herokuapp.com/profile/detail/get',
          { id: _id },
        );
        if (!details) {
          hideLoading();
          return;
        }
        details.data.some((detail) => {
          const item = (
            <Detail image={detail.image} uploader={detail.uploader} content={detail.content} />
          );
          const cont = document.createElement('li');
          cont.className = 'detailItems';
          try {
            document.getElementById('detailList').appendChild(cont);
            const conts = document.getElementsByClassName('detailItems');
            render(item, conts[conts.length - 1]);
            return false;
          } catch (err) {
            return true;
          }
        });
      } finally {
        setStatus('block');
      }
      hideLoading();
    };
    delegate();
  };

  const Close = () => {
    setStatus('none');
    const items = document.getElementsByClassName('detailItems');
    for (let i = items.length - 1; i >= 0; i -= 1) {
      items[i].remove();
    }
  };

  return (
    <>
      <div className="backD" />
      <div className="modalD">
        <img
          aria-hidden
          src="/close.svg"
          alt="close"
          className="modalClose"
          onKeyPress={Close}
          onClick={Close}
        />
        <ul id="detailList">
          <div aria-hidden id="registryLink" onKeyPress={registry.method} onClick={registry.method}>
            <img className="registry" src="/plus.svg" alt="registry" />
          </div>
        </ul>
      </div>

      <style jsx>
        {`
          .registry {
            margin-left: 120px;
            margin-top: 50px;
            margin-bottom: 50px;
            cursor: pointer;
          }

          #detailList {
            list-style: none;
          }

          .backD {
            position: fixed;
            display: ${status};
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: #000000;
            z-index: 99998;
            margin: 0;
            padding: 0;
            animation: backgroundAnimation 0.3s ease-in-out both;
          }

          @keyframes backgroundAnimation {
            0% {
              opacity: 0%;
            }
            100% {
              opacity: 40%;
            }
          }

          .modalD {
            position: fixed;
            display: ${status};
            left: 50%;
            top: 0%;
            opacity: 0;
            transform: translate(-50%, -50%);
            z-index: 99999;
            background-color: #2b2b2b;
            border-radius: 36px;
            box-shadow: 3px 3px 8px #000000aa, -2px -2px 8px #808080aa;
            max-width: 1060px;
            width: 90%;
            height: 90%;
            animation: modalAnimation 0.1s both;
            animation-delay: 0.2s;
            text-align: justify;
            overflow-x: hidden;
            overflow-y: auto;
          }

          @keyframes modalAnimation {
            0% {
              opacity: 0%;
              top: 30%;
            }
            100% {
              opacity: 100%;
              top: 50%;
            }
          }

          .modalClose {
            position: sticky;
            left: 10px;
            top: 30px;
            width: 70px !important;
            height: 35px !important;
            transform: scale(1.2);
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export { DetailList, showDetail };
