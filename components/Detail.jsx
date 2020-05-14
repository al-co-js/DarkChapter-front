import PropTypes from 'prop-types';
import React from 'react';

const Detail = (props) => {
  const { image, uploader, content } = props;

  return (
    <>
      <img src={image} alt="detailImage" className="image" />
      <span className="content">{content}</span>
      <span className="uploader">{`작성자 : ${uploader}`}</span>

      <style jsx>
        {`
          .image {
            width: 30%;
            margin-left: 80px;
            margin-top: 50px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            pointer-events: none;
          }

          .content {
            position: absolute;
            font-size: 20px;
            margin-left: 40px;
            margin-top: 120px;
            margin-right: 50px;
            word-break: break-all;
          }

          .uploader {
            position: absolute;
            font-size: 30px;
            margin-left: 40px;
            margin-top: 50px;
          }
        `}
      </style>
    </>
  );
};

Detail.propTypes = {
  image: PropTypes.string.isRequired,
  uploader: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Detail;
