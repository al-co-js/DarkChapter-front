import PropTypes from 'prop-types';
import React, { useState } from 'react';

const TextBox = (props) => {
  const {
    type, placeholder, className, id, onKeyPress,
  } = props;

  const [state, setState] = useState({
    y: 23,
    color: '#777777',
  });
  const [ref, setRef] = useState();

  const focus = () => {
    setState({
      y: 0,
      color: '#1ba0f2',
    });
  };

  const blur = () => {
    if (ref.value === '') {
      setState({
        y: 23,
        color: '#777777',
      });
    } else {
      setState({
        y: 0,
        color: '#f2811d',
      });
    }
  };

  return (
    <>
      <div>{placeholder}</div>
      <input
        ref={(dis) => {
          setRef(dis);
        }}
        onFocus={() => focus()}
        onBlur={() => blur()}
        className={className}
        id={id}
        type={type}
        onKeyPress={onKeyPress}
      />

      <style jsx>
        {`
          div {
            user-select: none;
            pointer-events: none;
            transition: all 0.2s ease-out;
            margin-bottom: -10px;
            transform: translate(2px, ${state.y}px);
            font-size: 18px;
            color: ${state.color};
          }

          input {
            border-width: 0 0 2px 0;
            border-color: #000000;
            font-size: 22px;
            width: 300px;
            height: 36px;
            outline: none;
            transition: all 0.2s ease-out;

            &:focus {
              border-color: #1ba0f2;
            }
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
  onKeyPress: () => {},
};

TextBox.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  onKeyPress: PropTypes.func,
};

export default TextBox;
