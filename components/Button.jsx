import React from 'react';
import PropTypes from 'prop-types';

const Tile = (props) => {
  const {
    className, id, children, onClick,
  } = props;

  return (
    <>
      <button className={className} id={id} type="button" onClick={() => { setTimeout(onClick, 150); }}>
        {children}
      </button>

      <style jsx>
        {`
          button {
            background-color: #2b2b2b;
            border-width: 0;
            border-radius: 18px;
            box-shadow: -2px -2px 3px #60606070, 3px 3px 6px #00000070;
            transition: all ease-in-out 0.1s;
            font-size: 35px;
            color: #d6d6d6;
            width: 314px;
            height: 56px;
            outline: none;

            &:focus {
              box-shadow: 1px 1px #60606070, -2px -2px #00000070;
            }
          }
        `}
      </style>
    </>
  );
};

Tile.defaultProps = {
  className: '',
  id: '',
  children: null,
  onClick: () => {},
};

Tile.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func,
};

export default Tile;
