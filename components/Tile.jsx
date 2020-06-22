import PropTypes from 'prop-types';
import React from 'react';

const Tile = (props) => {
  const { className, id, children } = props;

  return (
    <>
      <div className={className} id={id}>
        {children}
      </div>

      <style jsx>
        {`
          div {
            border-radius: 34px;
            box-shadow: 0 3px 6px #00000044;
            margin-top: 50px;
            margin-bottom: 50px;
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
};

Tile.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default Tile;
