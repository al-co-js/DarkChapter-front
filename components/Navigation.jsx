import React from 'react';

const Navigation = () => (
  <>
    <ui className="container">
      <li className="list">
        <a className="link" href="/">
          {' '}
        </a>
      </li>
      <li className="list">
        <a className="link" href="/">
          {' '}
        </a>
      </li>
      <li className="list">
        <a className="link" href="/">
          {' '}
        </a>
      </li>
    </ui>

    <style jsx>
      {`
        .container {
          position: relative;
          float: right;
          list-style: none;
          right: 30px;
          top: 30px;
          z-index: 9999;
        }

        .list {
          display: inline-block;
          margin-right: 35px;
        }

        .link {
          text-decoration: none;
          color: #d6d6d6;
          font-size: 23px;
          transition: all ease-in-out 0.3s;
          user-select: none;

          &:hover {
            color: #ffea3d;
          }
        }
      `}
    </style>
  </>
);

export default Navigation;
