import React from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const Navigation = () => {
  let open = false;
  const [{
    x, y, width, height, marginLeft,
  }, set] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    let buf = my;
    if (my <= 0) {
      buf = my + 100;
    }
    if (!open) {
      set({
        x: down && buf < 250 ? mx / 4 : 0,
        y: down && buf < 250 ? buf : 0,
        width: down && buf < 250 ? buf * 6 : 300,
        height: down && buf < 250 ? buf * 1.5 : 300,
        marginLeft: down && buf < 250 && buf * 6 > 300 ? -(buf * 3) : -150,
      });
      if (my >= 250) {
        open = true;
        set({
          x: 250,
          y: 250,
          width: 1300,
          height: 325,
          marginLeft: -900,
        });
      }
    } else {
      set({
        x: 250,
        y: down && buf < 250 && buf >= 80 ? buf : 250,
        width: 1300,
        height: 325,
        marginLeft: -900,
      });
      if (buf < 80) {
        open = false;
        set({
          x: 500,
          y: 500,
          width: 500,
          height: 500,
          marginLeft: -150,
        });
      }
    }
  });

  return (
    <>
      <animated.div
        className="container"
        onMouseDown={bind().onMouseDown}
        onTouchMove={bind().onTouchMove}
        style={{
          x,
          y,
          width,
          height,
          marginLeft,
        }}
      />

      <style jsx global>
        {`
          .container {
            position: fixed;
            display: flex;
            left: 50%;
            margin-left: -150px;
            margin-top: -270px;
            border-radius: 20px;
            background-color: #ffffff;
            min-width: 300px;
            min-height: 300px;
          }
        `}
      </style>
    </>
  );
};

export default Navigation;
