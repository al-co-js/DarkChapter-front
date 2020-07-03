import React, { useState } from 'react';

let showLoading;
let closeLoading;

const Loading = () => {
  const [status, setStatus] = useState('none');
  const [modal, setModal] = useState();
  const [back, setBack] = useState();

  showLoading = () => {
    setStatus('block');
    back.animate(
      [
        {
          backgroundColor: '#00000000',
          backdropFilter: 'blur(1px)',
        },
        {
          backgroundColor: '#000000ce',
          backdropFilter: 'blur(6px)',
        },
      ],
      {
        easing: 'ease',
        duration: 300,
        fill: 'both',
      },
    );
    modal.animate(
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
        duration: 300,
        fill: 'both',
      },
    );
  };

  closeLoading = () => {
    back.animate(
      [
        {
          backgroundColor: '#000000ce',
          backdropFilter: 'blur(6px)',
        },
        {
          backgroundColor: '#00000000',
          backdropFilter: 'blur(1px)',
        },
      ],
      {
        easing: 'ease',
        duration: 300,
        fill: 'both',
      },
    );
    modal.animate(
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
        duration: 300,
        fill: 'both',
      },
    );
    setTimeout(() => { setStatus('none'); }, 300);
  };

  return (
    <>
      <div
        className="back"
        ref={(dis) => {
          setBack(dis);
        }}
      />
      <img
        className="modalL"
        ref={(dis) => {
          setModal(dis);
        }}
        src="/loading.svg"
        alt="loading"
      />

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
            backdrop-filter: blur(1px);  
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
          }
        `}
      </style>
    </>
  );
};

export { Loading, showLoading, closeLoading };
