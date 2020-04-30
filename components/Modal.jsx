import React from 'react';
import PropTypes from 'prop-types';

const Tile = (props) => {
  const {
    className, id, title, content,
  } = props;

  return (
    <>
      <div className={className} id={id}>
        <div className="title">
          {title}
        </div>
        <div className="content">
          {content}
        </div>
      </div>
      <style jsx>
        {`
          
        `}
      </style>
    </>
  );
};

Tile.defaultProps = {
  className: '',
  id: '',
  title: '',
  content: '',
};

Tile.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default Tile;
