import PropTypes from 'prop-types';
import React from 'react';

const Button = ({
  className, id, children, onClick,
}) => (
  <>
    <button
      className={className}
      id={id}
      type="button"
      onClick={() => {
        setTimeout(onClick, 150);
      }}
    >
      {children}
    </button>

    <style jsx>
      {`
        button {
          transition: all ease 0.6s;
          font-size: 35px;
          width: 256px;
          height: 56px;
          color: #1ba0f2;
          border: 2px solid;
          border-radius: 15px;
          border-color: #1ba0f2;
          background-color: #ffffff;
          background-image: url('/water.svg');
          background-repeat: repeat-x;
          background-position: 0 -200%;

          &:hover {
            color: #ffffff;
            background-position: 100% 100%;
          }

          &:focus {
            outline: none;
          }
        }
      `}
    </style>
  </>
);

Button.defaultProps = {
  className: '',
  id: '',
  children: null,
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
    PropTypes.array,
  ]),
  onClick: PropTypes.func,
};

export default Button;
