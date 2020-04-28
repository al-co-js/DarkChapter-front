import React from 'react';
import PropTypes from 'prop-types';

const Navigation = (props) => {
  const style = {
    container: {
      position: 'relative',
      float: 'right',
      listStyle: 'none',
      right: '30px',
      top: '30px',
    },
    list: {
      display: 'inline-block',
      marginRight: '35px',
    },
    link: {
      textDecoration: 'none',
      color: '#D6D6D6',
    },
  };

  const { page } = props;

  return (
    <>
      <ui className="container">
        <li className="list">
          <a className="link" href={`/${page[0].link}`}>
            {page[0].name}
          </a>
        </li>
        <li className="list">
          <a className="link" href={`/${page[1].link}`}>
            {page[1].name}
          </a>
        </li>
        <li className="list">
          <a className="link" href={`/${page[2].link}`}>
            {page[2].name}
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
          }

          .list {
            display: inline-block;
            margin-right: 35px;
          }

          .link {
            text-decoration: none;
            color: #d6d6d6;
          }
        `}
      </style>
    </>
  );
};

Navigation.propTypes = {
  page: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navigation;
