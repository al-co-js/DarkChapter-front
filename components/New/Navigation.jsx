import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

const Navigation = () => {
  const [gr, setGr] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 400,
    height: 300,
    config: { mass: 10, tension: 800, friction: 100 },
  }));
  const [le, setLe] = useSpring(() => ({
    x: -260,
  }));

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState();

  const grab = () => {
    if (open) {
      setOpen(false);
      setGr({
        x: 0,
        y: 0,
        width: 400,
        height: 300,
      });
      setLe({
        x: -260,
      });
    } else {
      setOpen(true);
      setGr({
        x: 0,
        y: 150,
        width: 1300,
        height: 425,
      });
    }
  };

  const hover = (index) => {
    const items = document.getElementsByClassName('naviItem');
    const container = document.getElementsByClassName('container')[0];
    setLe({
      x:
        items[index].getBoundingClientRect().left
        - container.getBoundingClientRect().left,
    });
  };

  useEffect(() => {
    setToken(Cookies.get('token'));
  });

  return (
    <>
      <div className="wrapper">
        <animated.div className="container" style={gr}>
          <animated.div className="bar" style={le} />
          <div className="navWrapper">
            <ul className="naviList">
              <li className="naviItem">
                <Link href="/">
                  <a aria-hidden onClick={grab}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="130.628"
                      height="124.16"
                      viewBox="0 0 130.628 124.16"
                      onMouseEnter={() => hover(0)}
                      draggable={false}
                      className="navicon"
                      alt="home"
                    >
                      <path
                        id="home"
                        d={`
                        M128.434,67.837,117.4,
                        57.782V24.441a3.842,3.842,
                        0,0,0-3.842-3.842H86.994a3.842,
                        3.842,0,0,0-3.842,
                        3.842v2.136L69.826,
                        14.434a6.668,6.668,0,0,0-9.023,
                        0L2.194,67.838a6.7,6.7,0,0,0,
                        4.512,11.65h9.361v53.507a3.842,
                        3.842,0,0,0,3.842,
                        3.842H52.032a3.842,3.842,
                        0,0,0,3.842-3.842V100.506h18.88v32.488a3.842,
                        3.842,0,0,0,3.842,3.842h32.123a3.841,3.841,
                        0,0,0,3.841-3.842V79.487h9.363a6.7,6.7,
                        0,0,0,4.512-11.65ZM110.719,
                        71.8a3.842,3.842,0,0,0-3.842,
                        3.842v53.507H82.437V96.665A3.842,
                        3.842,0,0,0,78.6,92.823H52.032a3.842,
                        3.842,0,0,0-3.842,
                        3.842v32.488H23.749V75.646A3.842,
                        3.842,0,0,0,19.908,
                        71.8H9.247L65.314,20.717l19.093,
                        17.4a3.841,3.841,0,0,0,
                        6.429-2.84V28.282h18.88v31.2a3.841,
                        3.841,0,0,0,1.254,2.84l10.41,9.486Z
                    `}
                        transform="translate(0 -12.675)"
                      />
                    </svg>
                    <div>Home</div>
                  </a>
                </Link>
              </li>
              <li className="naviItem">
                <Link href="/profile">
                  <a aria-hidden onClick={grab}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="152.57"
                      height="119.877"
                      viewBox="0 0 152.57 119.877"
                      onMouseEnter={() => hover(1)}
                      draggable={false}
                      className="navicon"
                      alt="profile"
                    >
                      <g id="profile" transform="translate(-32 -80)">
                        <path
                          id="패스_18"
                          data-name="패스 18"
                          d={`
                          M81.022,208.767c.587.469,
                          14.566,11.495,31.672,
                          11.495s31.084-11.026,
                          31.672-11.495a2.725,2.725,
                          0,0,0,1.022-2.127c0-15.639-9.406-28.941-22.409-33.621a16.347,
                          16.347,0,1,0-20.568,0C89.406,177.7,
                          80,191,80,206.639A2.725,2.725,0,0,0,
                          81.022,208.767ZM101.8,160.323a10.9,
                          10.9,0,1,1,10.9,10.9A10.9,10.9,0,0,
                          1,101.8,160.323Zm10.9,16.347c14.61,
                          0,26.571,12.716,27.217,28.614-3.391,
                          2.4-14.545,9.528-27.217,
                          9.528s-23.826-7.131-27.217-9.528C86.123,
                          189.386,98.084,176.67,112.694,176.67Z
                      `}
                          transform="translate(-31.653 -42.181)"
                        />
                        <path
                          id="패스_19"
                          data-name="패스 19"
                          d={`
                          M45.622,199.877H170.948a13.638,
                          13.638,0,0,0,13.622-13.622V93.622A13.638,
                          13.638,0,0,0,170.948,80H45.622A13.638,
                          13.638,0,0,0,32,93.622v92.632a13.638,
                          13.638,0,0,0,13.622,13.622ZM37.449,
                          93.622a8.183,8.183,0,0,1,
                          8.173-8.173H170.948a8.183,
                          8.183,0,0,1,8.173,
                          8.173v92.632a8.183,8.183,0,
                          0,1-8.173,8.173H45.622a8.183,
                          8.183,0,0,1-8.173-8.173Z
                      `}
                        />
                        <path
                          id="패스_20"
                          data-name="패스 20"
                          d={`
                          M306.724,181.449h38.143a2.724,
                          2.724,0,1,0,0-5.449H306.724a2.724,
                          2.724,0,0,0,0,5.449Z
                      `}
                          transform="translate(-179.368 -63.306)"
                        />
                        <path
                          id="패스_21"
                          data-name="패스 21"
                          d={`
                          M306.724,229.449h38.143a2.724,
                          2.724,0,1,0,0-5.449H306.724a2.724,
                          2.724,0,0,0,0,5.449Z
                      `}
                          transform="translate(-179.368 -94.96)"
                        />
                        <path
                          id="패스_22"
                          data-name="패스 22"
                          d={`
                          M306.724,277.449h38.143a2.724,
                          2.724,0,1,0,0-5.449H306.724a2.724,
                          2.724,0,0,0,0,5.449Z
                      `}
                          transform="translate(-179.368 -126.613)"
                        />
                        <path
                          id="패스_23"
                          data-name="패스 23"
                          d={`
                          M306.724,325.449h38.143a2.724,
                          2.724,0,1,0,0-5.449H306.724a2.724,
                          2.724,0,0,0,0,5.449Z
                      `}
                          transform="translate(-179.368 -158.266)"
                        />
                      </g>
                    </svg>
                    <div>Profile</div>
                  </a>
                </Link>
              </li>
              <li className="naviItem">
                <Link href="/info">
                  <a aria-hidden onClick={grab}>
                    <svg
                      id="info"
                      xmlns="http://www.w3.org/2000/svg"
                      width="132.358"
                      height="132.358"
                      viewBox="0 0 132.358 132.358"
                      onMouseEnter={() => hover(2)}
                      draggable={false}
                      className="navicon"
                      alt="info"
                    >
                      <g id="그룹_2" data-name="그룹 2">
                        <g id="그룹_1" data-name="그룹 1">
                          <path
                            id="패스_15"
                            data-name="패스 15"
                            d={`
                            M66.179,0a66.179,66.179,
                            0,1,0,66.179,66.179A66.142,
                            66.142,0,0,0,66.179,
                            0Zm0,123.534a57.355,
                            57.355,0,1,1,57.355-57.355A57.42,
                            57.42,0,0,1,66.179,123.534Z
                        `}
                          />
                        </g>
                      </g>
                      <g
                        id="그룹_4"
                        data-name="그룹 4"
                        transform="translate(61.766 54.23)"
                      >
                        <g id="그룹_3" data-name="그룹 3">
                          <path
                            id="패스_16"
                            data-name="패스 16"
                            d={`
                            M243.342,209.777a4.412,
                            4.412,0,0,0-4.412,
                            4.412v37.218a4.412,
                            4.412,0,1,0,8.824,
                            0V214.189A4.412,4.412,
                            0,0,0,243.342,209.777Z
                        `}
                            transform="translate(-238.93 -209.777)"
                          />
                        </g>
                      </g>
                      <g
                        id="그룹_6"
                        data-name="그룹 6"
                        transform="translate(60.183 34.915)"
                      >
                        <g id="그룹_5" data-name="그룹 5">
                          <path
                            id="패스_17"
                            data-name="패스 17"
                            d="M227.863,124.122a6,6,0,1,0,6,6A6,6,0,0,0,227.863,124.122Z"
                            transform="translate(-221.867 -124.122)"
                          />
                        </g>
                      </g>
                    </svg>
                    <div>Info</div>
                  </a>
                </Link>
              </li>
              <li className="naviItem">
                {!token ? (
                  <Link href="/login">
                    <a aria-hidden onClick={grab}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="138.374"
                        height="132.358"
                        viewBox="0 0 138.374 132.358"
                        onMouseEnter={() => hover(3)}
                        draggable={false}
                        className="navicon"
                        alt="login"
                      >
                        <g id="login" transform="translate(0 -0.333)">
                          <path
                            id="패스_24"
                            data-name="패스 24"
                            d={`
                            M91.747,228.024H4.512a4.512,
                            4.512,0,1,1,0-9.024H91.747a4.512,
                            4.512,0,1,1,0,9.024Zm0,0
                        `}
                            transform="translate(0 -157.001)"
                          />
                          <path
                            id="패스_25"
                            data-name="패스 25"
                            d={`
                            M228.515,190.793a4.515,
                            4.515,0,0,1-3.189-7.707L246.2,
                            162.211l-20.876-20.876a4.514,
                            4.514,0,1,1,6.384-6.384l24.065,
                            24.066a4.513,4.513,0,0,1,0,
                            6.383L231.71,189.464A4.478,
                            4.478,0,0,1,228.515,190.793Zm0,0
                        `}
                            transform="translate(-160.832 -95.705)"
                          />
                          <path
                            id="패스_26"
                            data-name="패스 26"
                            d={`
                            M98.381,132.69A65.836,
                            65.836,0,0,1,36.787,
                            90.72a4.511,4.511,0,1,1,
                            8.4-3.3,57.155,57.155,
                            0,1,0,0-41.826,4.511,
                            4.511,0,1,1-8.4-3.3,
                            66.18,66.18,0,1,1,
                            61.594,90.388Zm0,0
                        `}
                            transform="translate(-26.186)"
                          />
                        </g>
                      </svg>
                      <div>Login</div>
                    </a>
                  </Link>
                ) : (
                  <Link href="/logout">
                    <a aria-hidden onClick={grab}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="128.374"
                        height="132.358"
                        viewBox="0 0 128.374 132.358"
                        onMouseEnter={() => hover(3)}
                        draggable={false}
                        className="navicon"
                        alt="logout"
                      >
                        <g id="logout" transform="translate(-10 -0.333)">
                          <path
                            id="패스_24"
                            data-name="패스 24"
                            d={`
                            M4.512,228.024H91.747a4.512,
                            4.512,0,1,0,0-9.024H4.512a4.512,
                            4.512,0,0,0,0,9.024Zm0,0
                        `}
                            transform="translate(10.004 -157.001)"
                          />
                          <path
                            id="패스_25"
                            data-name="패스 25"
                            d={`
                            M252.585,190.793a4.515,
                            4.515,0,0,0,3.189-7.707L234.9,
                            162.211l20.876-20.876a4.514,
                            4.514,0,0,0-6.384-6.384l-24.064,
                            24.066a4.513,4.513,0,0,0,0,
                            6.383l24.064,24.065A4.478,
                            4.478,0,0,0,252.585,190.793Zm0,0
                        `}
                            transform="translate(-214.004 -95.705)"
                          />
                          <path
                            id="패스_26"
                            data-name="패스 26"
                            d={`
                            M98.381,132.69A65.836,
                            65.836,0,0,1,36.787,
                            90.72a4.511,4.511,0,1,1,
                            8.4-3.3,57.155,57.155,0,
                            1,0,0-41.826,4.511,4.511,
                            0,1,1-8.4-3.3,66.18,
                            66.18,0,1,1,61.594,90.388Zm0,0
                        `}
                            transform="translate(-26.186)"
                          />
                        </g>
                      </svg>
                      <div>Logout</div>
                    </a>
                  </Link>
                )}
              </li>
              <li className="naviItem">
                <Link href="/join">
                  <a aria-hidden onClick={grab}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="114"
                      height="126"
                      viewBox="0 0 114 126"
                      onMouseEnter={() => hover(4)}
                      draggable={false}
                      className="navicon"
                      alt="join"
                    >
                      <g id="join" transform="translate(-1439.346 -60.784)">
                        <g
                          id="_-_2_"
                          data-name="- (2)"
                          transform="translate(1503.347 136.784)"
                        >
                          <g id="그룹_8" data-name="그룹 8">
                            <g id="그룹_7" data-name="그룹 7">
                              <path
                                id="패스_27"
                                data-name="패스 27"
                                d={`
                                M25,0A25,25,0,1,0,50,25,
                                25.027,25.027,0,0,0,25,
                                0Zm0,46.127A21.127,21.127,
                                0,1,1,46.127,25,21.152,
                                21.152,0,0,1,25,46.127Z
                            `}
                              />
                            </g>
                          </g>
                          <g
                            id="그룹_10"
                            data-name="그룹 10"
                            transform="translate(13.326 13.153)"
                          >
                            <g id="그룹_9" data-name="그룹 9">
                              <path
                                id="패스_28"
                                data-name="패스 28"
                                d={`
                                M158.424,144.966h-7.782v-7.782a1.946,
                                1.946,0,1,0-3.891,0v7.782h-7.782a1.946,
                                1.946,0,0,0,0,3.891h7.782v7.782a1.946,
                                1.946,0,0,0,3.891,0v-7.782h7.782a1.946,
                                1.946,0,0,0,0-3.891Z
                            `}
                                transform="translate(-137.022 -135.238)"
                              />
                            </g>
                          </g>
                        </g>
                        <path
                          id="빼기_1"
                          data-name="빼기 1"
                          d={`
                          M49.334,115.129A67.9,67.9,
                          0,0,1,31.1,112.518a87.022,
                          87.022,0,0,1-15.011-5.8A85.636,
                          85.636,0,0,1,1.542,97.784,
                          4.1,4.1,0,0,1,0,94.574a57.27,
                          57.27,0,0,1,2.524-16.89A54.983,
                          54.983,0,0,1,9.55,
                          63.006a51.931,51.931,
                          0,0,1,10.7-11.577,47.935,
                          47.935,0,0,1,13.563-7.587,
                          24.666,24.666,0,1,1,31.036,
                          0A47.533,47.533,0,0,1,74.78,
                          48.8a50.383,50.383,0,0,1,8.594,
                          7.123,53.129,53.129,0,0,1,6.962,
                          8.959,55.15,55.15,0,0,1,5.033,10.473,
                          26.656,26.656,0,0,
                          0-6.249-.74,26.938,26.938,0,0,
                          0-2.832.149c-6.866-15.44-21.371-25.417-36.954-25.417-22.046,
                          0-40.086,18.966-41.07,43.178,4.77,
                          3.372,21.829,14.378,41.07,
                          14.378A57.907,57.907,0,0,0,
                          62.9,105.218a26.32,26.32,0,0,0,
                          2.52,7.868A66.889,66.889,0,0,1,
                          49.334,115.129Zm0-106.889A16.444,
                          16.444,0,1,0,65.777,24.685,16.463,
                          16.463,0,0,0,49.334,8.24Z
                      `}
                          transform="translate(1439.346 60.784)"
                        />
                      </g>
                    </svg>
                    <div>Join</div>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="grabWrapper"
            role="button"
            onClick={grab}
            onKeyPress={grab}
            tabIndex={0}
          >
            <div className={open && 'arrow'}>
              <div className="chevron" />
              <div className="chevron" />
              <div className="chevron" />
            </div>
          </div>
        </animated.div>
      </div>

      <style jsx>
        {`
          a {
            text-decoration: none;
            color: #000000;
          }

          .arrow {
            transform: scaleY(-1);

            div {
              bottom: 90px;
            }
          }

          .naviList {
            position: absolute;
            list-style: none;
            padding: 0;
            margin: 0;
            user-select: none;
            width: 1300px;
            height: 158px;
            bottom: 140px;
            left: 50%;
            transform: translate(-50%);
          }

          .naviItem {
            display: inline-block;
            margin-left: 60px;
            margin-right: 60px;
          }

          .navicon {
            user-select: none;
            width: 120px;
            height: auto;
            transition: all 0.2s ease-out;

            &:hover {
              transform: scale(1.1);
              fill: #1ba0f2;
            }
          }

          .wrapper {
            position: fixed;
            width: 100%;
            height: 0;
            align-items: center;
            text-align: center;
            z-index: 9999;
            opacity: 0.3;
            transition: opacity 0.3s ease-out;

            &:hover {
              opacity: 1;
            }
          }

          .navWrapper {
            width: 100%;
            height: 100%;
            align-items: center;
            text-align: center;
          }

          .grabWrapper {
            position: absolute;
            width: 100%;
            height: 100px;
            bottom: 0;
            align-items: center;
            text-align: center;

            &:focus {
              outline: 0;
            }
          }

          .chevron {
            position: absolute;
            left: 50%;
            bottom: 55px;
            width: 28px;
            height: 8px;
            opacity: 0;
            transform: scale3d(0.5, 0.5, 0.5) translateX(-100%);
            animation: move 3s ease-out infinite;
          }

          .chevron:nth-child(1) {
            animation: move 3s ease-out 0s infinite;
          }

          .chevron:nth-child(2) {
            animation: move 3s ease-out 1s infinite;
          }

          .chevron:nth-child(3) {
            animation: move 3s ease-out 2s infinite;
          }

          .chevron:before,
          .chevron:after {
            content: '';
            position: absolute;
            top: 0;
            height: 100%;
            width: 50%;
            background: #f2811d;
          }

          .chevron:before {
            left: 0;
            transform: skew(0deg, 30deg);
          }

          .chevron:after {
            right: 1px;
            width: 50%;
            transform: skew(0deg, -30deg);
          }

          @keyframes move {
            25% {
              opacity: 1;
            }
            33% {
              opacity: 1;
              transform: translate(-50%, 30px);
            }
            67% {
              opacity: 1;
              transform: translate(-50%, 40px);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, 55px) scale3d(0.5, 0.5, 0.5);
            }
          }

          @keyframes pulse {
            to {
              opacity: 1;
            }
          }
        `}
      </style>

      <style jsx global>
        {`
          .container {
            position: relative;
            margin: 0 auto;
            border-radius: 0 0 20px 20px;
            min-width: 400px;
            min-height: 300px;
            align-items: center;
            box-shadow: 0 3px 6px #00000044;
            background-color: #ffffff;
            overflow: hidden;
            top: -250px;
            user-select: none;
          }

          .bar {
            position: absolute;
            bottom: 130px;
            width: 130px;
            height: 5px;
            border-radius: 2px;
            margin-left: -5px;
            background-color: #1ba0f2;
          }
        `}
      </style>
    </>
  );
};

export default Navigation;
