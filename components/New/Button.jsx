import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Button = ({
  className, id, children, onClick, color,
}) => {
  const [ref, setRef] = useState();

  return (
    <>
      <button
        ref={(dis) => {
          setRef(dis);
        }}
        className={className}
        id={id}
        type="button"
        onClick={(e) => {
          const child = document.createElement('span');
          const rect = ref.getBoundingClientRect();
          const posX = e.pageX - (rect.left + window.pageXOffset);
          const posY = e.pageY - (rect.top + window.pageYOffset);
          const width = ref.offsetWidth;
          const height = ref.offsetHeight;
          const buf = width <= height ? height : width;
          child.className = 'ripple';
          child.style.width = `${buf}px`;
          child.style.height = `${buf}px`;
          child.style.left = `${posX - width * 0.514}px`;
          child.style.top = `${posY - height * 1.79}px`;
          child.addEventListener('animationend', () => {
            child.remove();
          });
          ref.appendChild(child);
          setTimeout(onClick, 300);
        }}
      >
        {children}
      </button>

      <style jsx>
        {`
          button {
            transition: all ease 0.6s;
            font-size: 22px;
            width: 160px;
            height: 46px;
            color: ${color === 'blue' ? '#1ba0f2' : '#f2811d'};
            border-width: 2px;
            border-style: solid;
            border-radius: 15px;
            border-color: ${color === 'blue' ? '#1ba0f2' : '#f2811d'};
            background-color: #ffffff;
            background-image: url('/${color}Water.svg');
            background-repeat: repeat-x;
            background-position: 0 -120%;
            overflow: hidden;
            user-select: none;

            &:hover {
              color: #ffffff;
              background-position: 100% 70%;
            }

            &:focus {
              outline: none;
            }
          }
        `}
      </style>

      <style jsx global>
        {`
          .ripple {
            background-color: #ffffff99;
            position: absolute;
            transform: scale(0);
            animation: ripple 1s;
            border-radius: 50%;
            z-index: 9999;
          }

          @keyframes ripple {
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
};

Button.defaultProps = {
  className: '',
  id: '',
  children: null,
  onClick: () => { },
  color: 'blue',
};

Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
    PropTypes.array,
  ]),
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default Button;
