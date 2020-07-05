import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '../../components/Button';
import { closeLoading, Loading, showLoading } from '../../components/Loading';
import { showModal } from '../../components/Modal';

const registry = () => {
  const [uploader, setUploader] = useState('');
  const [image, setImage] = useState('/imageSelect.svg');
  const [file, setFile] = useState(<></>);
  const [name, setName] = useState(<></>);

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
    };
  };

  const profileRegistry = () => {
    const delegate = async () => {
      const target = name.textContent;
      if (image === '/imageSelect.svg') {
        showModal('프로필 이미지를 선택해주세요', 'ok', 'error');
        return;
      }
      if (!target || target === '이름 입력') {
        showModal('이름을 입력해주세요', 'ok', 'error');
        return;
      }
      if (target.search(' ') !== -1) {
        showModal('이름에는 공백이 포함될 수 없습니다', 'ok', 'error');
        return;
      }

      try {
        showLoading();
        const token = Cookies.get('token');
        await axios.post('https://darkchapter-back.herokuapp.com/profile/registry', {
          token,
          target,
          image,
        });
        closeLoading();
        showModal('성공적으로 프로필을 생성했습니다', 'ok', 'success', () => {
          Router.push('/profile');
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

  return (
    <>
      <Loading />
      <div
        className="profileContainer"
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
        <div
          className="target"
          ref={(dis) => {
            setName(dis);
          }}
          contentEditable
        >
          이름 수정
        </div>
        <div className="uploader">{uploader}</div>
      </div>

      <Button id="registryButton" onClick={profileRegistry}>
        만들기
      </Button>

      <style jsx>
        {`
          .profileContainer {
            background-color: #ffffff;
            border-radius: 46px;
            width: 247px;
            height: 336px;
            text-align: center;
            border-width: 3px;
            border-style: solid;
            border-color: #1ba0f2;
            position: absolute;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%);
          }

          .image {
            border-radius: 36px;
            width: 195px;
            height: 195px;
            margin-top: 35px;
            user-select: none;
            cursor: pointer;
          }

          .target {
            font-size: 35px;
            margin-top: 15px;
            user-select: none;
          }

          .uploader {
            font-size: 15px;
            margin-top: 10px;
            user-select: none;
          }

          #file {
            display: none;
          }
        `}
      </style>

      <style jsx global>
        {`
          #registryButton {
            position: absolute;
            left: 50%;
            top: 70%;
            transform: translate(-50%, -50%);
          }
        `}
      </style>
    </>
  );
};

export default registry;
