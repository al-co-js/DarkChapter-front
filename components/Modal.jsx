import React, { useState } from 'react';

// eslint-disable-next-line import/no-mutable-exports
let showModal;

const Modal = () => {
  const [title, setTitle] = useState('title');
  const [content, setContent] = useState('content');
  const [status, setStatus] = useState('none');
  const [callback, setCallback] = useState({ method: () => {} });

  showModal = (_title, _content, _callback) => {
    setTitle(_title);
    setContent(_content);
    setStatus('block');
    if (_callback) {
      setCallback({ method: _callback });
    }
  };

  return (
    <>
      <div className="back" />
      <div className="modal">
        <div className="modalTitle">
          {title}
        </div>
        <div className="modalContent">
          {content}
        </div>
        <img
          aria-hidden
          src="close.svg"
          alt="close"
          className="modalClose"
          onKeyPress={() => {
            setStatus('none');
            callback.method();
          }}
          onClick={() => {
            setStatus('none');
            callback.method();
          }}
        />
      </div>

      <style jsx>
        {`
          .back {
            position: absolute;
            display: ${status};
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

          .modal {
            position: absolute;
            display: ${status};
            left: 50%;
            top: 0%;
            opacity: 0;
            transform: translate(-50%, -50%);
            z-index: 99999;
            background-color: #2b2b2b;
            border-radius: 36px;
            box-shadow: 3px 3px 8px #000000aa, -2px -2px 8px #808080aa;
            min-width: 350px;
            min-height: 160px;
            max-width: 650px;
            max-height: 580px;
            animation: modalAnimation 0.1s both;
            animation-delay: 0.2s;
            text-align: justify;
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

          .modalTitle {
            position: relative;
            left: 25px;
            top: 20px;
            font-size: 35px;
          }

          .modalContent {
            position: relative;
            left: 20px;
            top: 35px;
            font-size: 22px;
            width: 94%;
            word-break: break-all;
            margin-bottom: 65px;
            max-width: 640px;
            max-height: 410px;
            overflow-y: auto;
          }

          .modalClose {
            position: absolute;
            top: 20px;
            right: 0;
            width: 70px !important;
            height: 35px !important;
            position: absolute;
            transform: scale(1.2);
            cursor: pointer;
          }
      `}
      </style>
    </>
  );
};

export {
  Modal, showModal,
};
