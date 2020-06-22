import PropTypes from 'prop-types';
import React, { useState } from 'react';

const TextBox = ({
  type, placeholder, className, id, onKeyPress, rule, setText,
}) => {
  const [state, setState] = useState({
    y: 23,
    color: '#777777',
  });
  const [ref, setRef] = useState();
  const [msg, setMsg] = useState();

  const focus = () => {
    setState({
      y: 0,
      color: '#f2811d',
    });
  };

  const blur = () => {
    if (ref.value === '') {
      setState({
        y: 23,
        color: '#777777',
      });
      setMsg('');
    } else {
      const result = rule(ref.value);
      if (result.success) {
        setMsg();
        setState({
          y: 0,
          color: '#1ba0f2',
        });
      } else {
        setMsg(` - ${result.message}`);
        setState({
          y: 0,
          color: '#f26666',
        });
      }
    }
  };

  return (
    <>
      <div className={className} id={id}>
        <div>
          {placeholder}
          <span>{msg}</span>
        </div>
        <input
          ref={(dis) => {
            setRef(dis);
            setText(dis);
          }}
          onFocus={() => focus()}
          onBlur={() => blur()}
          type={type}
          onKeyPress={onKeyPress}
        />
      </div>

      <style jsx>
        {`
          div div {
            user-select: none;
            pointer-events: none;
            transition: all 0.2s ease-out;
            margin-bottom: -10px;
            transform: translate(2px, ${state.y}px);
            font-size: 18px;
            color: ${state.color};

            span {
              font-size: 14px;
            }
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
              border-color: #f2811d;
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
  rule: () => ({ success: true }),
  setText: () => {},
};

TextBox.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  onKeyPress: PropTypes.func,
  rule: PropTypes.func,
  setText: PropTypes.func,
};

export default TextBox;
