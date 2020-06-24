import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '../../components/Button';
import { hideLoading, Loading, showLoading } from '../../components/Loading';
import { showModal } from '../../components/Modal';

const registry = () => {
  let token;
  const [image, setImage] = useState('/imageSelect.svg');

  useEffect(() => {
    token = Cookies.get('token');
    const delegate = async () => {
      if (!token) {
        showModal('오류', '로그인이 필요한 작업입니다', () => {
          Router.push('/login');
        });
      }

      try {
        const verified = await axios.post('http://darkchapter-back.herokuapp.com/auth/verify', {
          token,
          need: true,
        });
        if (!verified) {
          showModal('오류', '로그인이 필요한 작업입니다', () => {
            Router.push('/login');
          });
        }
        document.getElementById(
          'uploader',
        ).textContent = `작성자 : ${verified.data.schoolId} ${verified.data.name}`;
      } catch (err) {
        showModal('오류', '로그인이 필요한 작업입니다', () => {
          Router.push('/login');
        });
      }
    };
    delegate();

    const page = [
      {
        name: 'Logout',
        link: 'logout',
      },
      {
        name: 'Profiles',
        link: 'profiles',
      },
      {
        name: 'Info',
        link: 'info',
      },
    ];

    const links = document.getElementsByClassName('link');
    for (let i = 0; i < 3; i += 1) {
      links[i].href = `/${page[i].link}`;
      links[i].textContent = page[i].name;
    }
  });

  const Registry = async () => {
    const name = document.getElementById('name').textContent;
    if (image === '/imageSelect.svg') {
      showModal('오류', '프로필 이미지가 선택되지 않았습니다');
      return;
    }
    if (!name || name === '이름 입력') {
      showModal('오류', '이름을 입력해주세요');
      return;
    }
    if (name.search(' ') !== -1) {
      showModal('오류', '이름에는 공백이 포함될 수 없습니다');
      return;
    }

    try {
      showLoading();
      await axios.post('http://darkchapter-back.herokuapp.com/profile/registry', {
        token,
        target: name,
        image,
      });
      hideLoading();
      showModal('성공', '성공적으로 프로필을 생성했습니다', () => {
        Router.push('/profiles');
      });
    } catch (err) {
      hideLoading();
      if (err.message === 'Network Error') {
        showModal('오류', '서버와 연결에 실패했습니다');
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
      showModal('오류', msg, () => {
        if (err.response.status === 403) {
          Router.push('/login');
        }
      });
    }
  };

  const ImageSelect = () => {
    const { files } = document.getElementById('file');
    const fileReader = new FileReader();
    if (!files[0]) {
      return;
    }
    fileReader.readAsDataURL(files[0]);
    fileReader.onloadend = () => {
      setImage(fileReader.result);
    };
  };

  return (
    <>
      <Loading />
      <div className="container">
        <label htmlFor="file">
          <img className="image" src={image} alt="profileImage" />
          <input type="file" id="file" accept="image/*" onChange={ImageSelect} />
        </label>
        <div contentEditable className="target" id="name">
          이름 입력
        </div>
        <div className="uploader" id="uploader" />
        <Button className="upload" onClick={Registry}>
          Upload
        </Button>
      </div>

      <style jsx>
        {`
          .container {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(1.5);
            background-color: #2b2b2b;
            border-radius: 46px;
            width: 247px;
            height: 336px;
            text-align: center;
            box-shadow: 3px 3px 6px #00000070, -2px -2px 3px #60606070;
          }

          .image {
            border-radius: 36px;
            width: 195px;
            height: 195px;
            margin-top: 35px;
            cursor: pointer;
          }

          .target {
            font-size: 35px;
            margin-top: 15px;
          }

          .uploader {
            font-size: 15px;
            margin-top: 10px;
          }

          #file {
            display: none;
          }
        `}
      </style>

      <style jsx global>
        {`
          .upload {
            position: absolute;
            left: 50%;
            bottom: -80px;
            width: 200px !important;
            font-size: 25px !important;
            transform: translate(-50%);
          }
        `}
      </style>
    </>
  );
};

export default registry;
