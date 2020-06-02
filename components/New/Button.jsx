import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Button = ({
  className, id, children, onClick,
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
          const width = ref.offsetWidth;
          const height = ref.offsetHeight;
          const posX = e.pageX - ref.offsetLeft;
          const posY = e.pageY - ref.offsetTop;
          const buf = width <= height ? height : width;
          child.className = 'ripple';
          child.style.width = `${buf}px`;
          child.style.height = `${buf}px`;
          child.style.left = `${posX - 2}px`;
          child.style.top = `${posY - buf * 0.37}px`;
          child.addEventListener('animationend', () => {
            child.remove();
          });
          ref.appendChild(child);
          setTimeout(onClick, 1000);
        }}
      >
        {children}
      </button>

      <style jsx>
        {`
          button {
            transition: all ease 0.8s;
            font-size: 22px;
            width: 160px;
            height: 46px;
            color: #1ba0f2;
            border-width: 2px;
            border-style: solid;
            border-radius: 15px;
            border-color: #1ba0f2;
            background-color: #ffffff;
            background-image: url('/water.svg');
            background-repeat: repeat-x;
            background-position: 0 -200%;
            overflow: hidden;
            user-select: none;

            &:hover {
              color: #ffffff;
              background-position: 100% 100%;
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
  onClick: () => {},
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
};

export default Button;
