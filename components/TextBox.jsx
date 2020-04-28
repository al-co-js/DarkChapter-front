import React from 'react';
import PropTypes from 'prop-types';

const TextBox = (props) => {
  const {
    type, placeholder, className, id,
  } = props;

  return (
    <>
      <input className={className} id={id} type={type} placeholder={placeholder} />

      <style jsx>
        {`
          input {
            background-color: #2b2b2b;
            border-width: 0;
            border-radius: 14px;
            color: #d6d6d6;
            font-size: 22px;
            box-shadow: inset -1px -1px #60606070, inset 2px 2px #00000070;
            padding-left: 10px;
            padding-right: 10px;
            width: 294px;
            height: 36px;
            outline: none;
          }
        `}
      </style>
    </>
  );
};

TextBox.defaultProps = {
  type: 'text',
  placeholder: '',
  className: '',
  id: '',
};

TextBox.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default TextBox;
