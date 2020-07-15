import axios from 'axios';
import Compressor from 'compressorjs';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

import Button from '../Button';
import { closeLoading, showLoading } from '../Loading';
import { showModal } from '../Modal';

let showRegistry;

const Registry = () => {
  const [back, setBack] = useState(<></>);
  const [registry, setRegistry] = useState(<></>);
  const [state, setState] = useState('none');
  const router = useRouter();
  const { id } = router.query;
  const [imageFile, setImageFile] = useState('');
  const [file, setFile] = useState(<></>);
  const [image, setImage] = useState('/imageSelect.svg');
  const [uploader, setUploader] = useState('');
  const [text, setText] = useState(<></>);

  useEffect(() => {
    const delegate = async () => {
      const token = Cookies.get('token');
      if (!token) {
        showModal('로그인이 필요한 작업입니다', 'ok', 'info', () => {
          Router.push('/login');
        });
        return;
      }

      try {
        const verified = await axios.post('https://darkchapter-back.herokuapp.com/auth/verify', {
          token,
          need: true,
        });
        if (!verified) {
          showModal('로그인이 필요한 작업입니다', 'ok', 'info', () => {
            Router.push('/login');
          });
          return;
        }
        setUploader(`작성자 : ${verified.data.schoolId} ${verified.data.name}`);
      } catch (err) {
        showModal('로그인이 필요한 작업입니다', 'ok', 'info', () => {
          Router.push('/login');
        });
      }
    };
    delegate();
  }, []);

  const imageSelect = () => {
    const { files } = file;
    const fileReader = new FileReader();
    if (!files[0]) {
      return;
    }
    fileReader.readAsDataURL(files[0]);
    fileReader.onloadend = () => {
      setImage(fileReader.result);
      setImageFile(files[0]);
    };
  };

  const closeDetail = () => {
    back.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      {
        easing: 'ease',
        duration: 400,
        fill: 'both',
      },
    );
    registry.animate(
      [
        {
          opacity: 1,
          top: '-30%',
        },
        {
          opacity: 0,
          top: '-80%',
        },
      ],
      {
        easing: 'ease',
        duration: 400,
        fill: 'both',
      },
    );
    setTimeout(() => setState('none'), 400);
  };

  const cancel = () => {
    closeDetail();
    Router.push('/profile');
  };

  showRegistry = () => {
    setState('block');
    back.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      {
        easing: 'ease',
        duration: 400,
        fill: 'both',
      },
    );
    registry.animate(
      [
        {
          opacity: 0,
          top: '-80%',
        },
        {
          opacity: 1,
          top: '-30%',
        },
      ],
      {
        easing: 'ease',
        duration: 400,
        fill: 'both',
      },
    );
  };

  const ok = () => {
    const delegate = async () => {
      const content = text.textContent;
      if (image === '/imageSelect.svg') {
        showModal('프로필 이미지를 선택해주세요', 'ok', 'error');
        return;
      }
      if (content === '내용을 수정해보세요') {
        showModal('내용을 입력해주세요', 'ok', 'error');
        return;
      }

      try {
        showLoading();
        new Compressor(imageFile, {
          quality: 0.7,
          maxWidth: 400,
          maxHeight: 400,
          success(result) {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onloadend = async () => {
              const base64data = reader.result;
              const token = Cookies.get('token');
              await axios.post('https://darkchapter-back.herokuapp.com/profile/detail/registry', {
                token,
                id,
                image: base64data,
                content,
              });
              closeLoading();
              showModal('성공적으로 프로필을 생성했습니다', 'ok', 'success', () => {
                Router.push('/profile');
                window.location.reload();
              });
            };
          },
          error(err) {
            closeLoading();
            showModal(err, 'ok', 'error');
          },
        });
      } catch (err) {
        closeLoading();
        if (err.message === 'Network Error') {
          showModal('서버와 연결에 실패했습니다', 'ok', 'error');
          return;
        }
        let msg;
        switch (err.response.status) {
          case 403:
            msg = '토큰이 만료되었습니다';
            break;
          case 412:
            msg = '서버에 데이터가 제대로 전달되지 못했습니다';
            break;
          case 413:
            msg = '이미지의 용량이 너무 큽니다';
            break;
          case 500:
            msg = '서버에서 에러가 발생했습니다';
            break;
          default:
            msg = '알 수 없는 에러가 발생했습니다';
            break;
        }
        showModal(msg, 'ok', 'error', () => {
          if (err.response.status === 403) {
            Router.push('/login');
          }
        });
      }
    };
    delegate();
  };

  const [spring, setSpring] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 5, tension: 450, friction: 70 },
  }));

  return (
    <>
      <div
        ref={(dis) => {
          setBack(dis);
        }}
        onMouseMove={({ clientX: x, clientY: y }) => {
          setSpring({
            x: (x - window.innerWidth / 2) / 65,
            y: (y - window.innerWidth / 2) / 65,
          });
        }}
      >
        <animated.div
          ref={(dis) => {
            setRegistry(dis);
          }}
          className="detailR"
          style={spring}
        >
          <label htmlFor="file">
            <img className="image" src={image} alt="profileImage" />
            <input
              type="file"
              id="file"
              accept="image/*"
              ref={(dis) => {
                setFile(dis);
              }}
              onChange={imageSelect}
            />
          </label>
          <span
            contentEditable
            className="content"
            id="content"
            ref={(dis) => {
              setText(dis);
            }}
          >
            내용을 수정해보세요
          </span>
          <span className="uploader" id="uploader">
            {uploader}
          </span>
          <Button className="ok" onClick={ok}>
            확인
          </Button>
          <Button className="cancel" color="orange" onClick={cancel}>
            취소
          </Button>
        </animated.div>
      </div>

      <style jsx>
        {`
          .detailList {
            position: absolute;
            left: 48.5%;
            transform: translateX(-50%);
            top: 23%;
            width: 95%;
            height: 67%;
            overflow-y: scroll;
            list-style: none;
          }
        
          div {
            background-color: #00000066;
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 9999;
            opacity: 0;
            display: ${state};
          }
          
          .image {
            position: absolute;
            left: 20px;
            top: 300px;
            max-width: 400px;
            max-height: 400px;
            cursor: pointer;
          }

          .content {
            position: absolute;
            left: 450px;
            top: 360px;
            margin-right: 20px;
          }

          .uploader {
            position: absolute;
            left: 450px;
            top: 300px;
            font-size: 30px;
          }

          #file {
            display: none;
          }
        `}
      </style>

      <style jsx global>
        {`
          .ok {
            position: absolute;
            right: 20px;
            bottom: 20px;
          }

          .cancel {
            position: absolute;
            right: 200px;
            bottom: 20px;
          }

          .detailR {
            position: relative;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 3px 6px #00000066;
            z-index: 99999;
            width: 70%;
            height: 130%;
            max-width: 1500px;
            max-height: 1700px;
            top: -80%;
            display: ${state};
            border-radius: 0 0 20px 20px;
            opacity: 0;
            will-change: "transform";
          }
        `}
      </style>
    </>
  );
};

export { Registry, showRegistry };
