import PropTypes from 'prop-types';
import React from 'react';

const Detail = (props) => {
  const { image, uploader, content } = props;

  return (
    <>
      <img src={image} alt="detailImage" />
      <span>{content}</span>
      <span>{uploader}</span>
    </>
  );
};

Detail.propTypes = {
  image: PropTypes.string.isRequired,
  uploader: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Detail;
