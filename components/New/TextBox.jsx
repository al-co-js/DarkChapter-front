import PropTypes from 'prop-types';
import React, { useState } from 'react';

const TextBox = (props) => {
  const {
    type, placeholder, className, id, onKeyPress,
  } = props;

  const [state, setState] = useState({
    x: 2,
    y: 23,
    scale: 1,
    color: '#777777',
  });
  const [ref, setRef] = useState();

  const focus = () => {
    setState({
      x: -168,
      y: 0,
      scale: 0.8,
      color: '#1ba0f2',
    });
  };

  const blur = () => {
    if (ref.value === '') {
      setState({
        x: 2,
        y: 23,
        scale: 1,
        color: '#777777',
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
            transform: translate(${state.x}px, ${state.y}px) scale(${state.scale});
            font-size: 22px;
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
