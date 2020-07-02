import React, { useState } from 'react';

let showLoading;
let hideLoading;

const Loading = () => {
  const [status, setStatus] = useState('none');

  showLoading = () => {
    setStatus('block');
  };

  hideLoading = () => {
    setStatus('none');
  };

  return (
    <>
      <div className="back" />
      <img className="modalL" src="/loading.svg" alt="loading" />

      <style jsx>
        {`
          .back {
            position: fixed;
            display: ${status};
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #00000000;
            z-index: 99998;
            margin: 0;
            padding: 0;
            backdrop-filter: blur(6px);  
            animation: backgroundAnimation 0.3s ease-in-out both;
          }

          @keyframes backgroundAnimation {
            0% {
              background-color: #00000000;
            }
            100% {
              background-color: #000000ce;
            }
          }

          .modalL {
            position: fixed;
            display: ${status};
            left: 0;
            top: 0;
            left: 50%;
            top: 50%;
            opacity: 0;
            transform: translate(-50%, -50%);
            z-index: 99999;
            animation: modalAnimation 0.3s ease-in-out both;
          }

          @keyframes modalAnimation {
            0% {
              opacity: 0%;
            }
            100% {
              opacity: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export { Loading, showLoading, hideLoading };
