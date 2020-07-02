import Link from 'next/link';
import React from 'react';

const notFound = () => (
  <>
    <div className="errorMessage">404</div>
    <Link href="/">
      <a className="gotoMain">
        Main
      </a>
    </Link>

    <style jsx>
      {`
          .errorMessage {
            position: absolute;
            font-size: 150px;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%);
            color: #f26666;
            user-select: none;
          }

          .gotoMain {
            position: absolute;
            font-size: 60px;
            left: 50%;
            top: 60%;
            transform: translate(-50%, -50%);
            color: #1ba0f2;
            text-decoration: none;
            user-select: none;
          }
        `}
    </style>
  </>
);

export default notFound;
