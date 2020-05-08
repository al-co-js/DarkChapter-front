import React from 'react';

const about = () => (
  <>
    <div className="errorMessage">
      404
    </div>
    <a className="gotoMain" href="/">
      Main
    </a>

    <style jsx>
      {`
        .errorMessage {
          position: absolute;
          font-size: 150px;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
          color: #2b2b2b;
          text-shadow: 0px 0px 0px #60606070, 0px 0px 0px #00000070;
          animation: Wildly 2s ease-in-out infinite;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .gotoMain {
          position: absolute;
          font-size: 60px;
          left: 50%;
          top: 60%;
          transform: translate(-50%, -50%);
          color: #2b2b2b;
          text-shadow: -2px -2px 3px #60606070, 2px 2px 3px #00000070;
          text-decoration: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        @keyframes Wildly {
          0% {
            text-shadow: 0px 0px 0px #60606070, 0px 0px 0px #00000070;
          }
          50% {
            text-shadow: -3px -3px 4px #60606070, 3px 3px 4px #00000070;
          }
        }
      `}
    </style>
  </>
);

export default about;
