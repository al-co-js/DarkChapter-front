import React from 'react';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const {
    target, uploader, image, scale,
  } = props;

  return (
    <>
      <div className="container">
        <img className="image" src={image} alt="profileImage" />
        <div className="target">{target}</div>
        <div className="uploader">{`작성자 : ${uploader}`}</div>

        <style jsx>
          {`
          .container {
            background-color: #2b2b2b;
            border-radius: 46px;
            width: 247px;
            height: 336px;
            text-align: center;
            transform: scale(${scale});
            box-shadow: 3px 3px 6px #00000070, -2px -2px 3px #60606070;
            cursor: pointer;
          }

          .image {
            border-radius: 36px;
            width: 195px;
            height: 195px;
            margin-top: 35px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          .target {
            font-size: 35px;
            margin-top: 15px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          .uploader {
            font-size: 15px;
            margin-top: 10px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        `}
        </style>
      </div>
    </>
  );
};

Profile.defaultProps = {
  scale: 1.0,
};

Profile.propTypes = {
  target: PropTypes.string.isRequired,
  uploader: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  scale: PropTypes.number,
};

export default Profile;
