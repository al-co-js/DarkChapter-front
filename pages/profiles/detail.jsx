import axios from 'axios';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '../../components/Button';
import { showModal } from '../../components/Modal';
import Navigation from '../../components/Navigation';

const detail = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    showModal('오류', '잘못된 접근입니다.', () => {
      Router.push('/');
    });
  }
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
        name: 'About',
        link: 'about',
      },
    ];

    const links = document.getElementsByClassName('link');
    for (let i = 0; i < 3; i += 1) {
      links[i].href = `/${page[i].link}`;
      links[i].textContent = page[i].name;
    }
  });

  const Registry = async () => {
    const content = document.getElementById('content').textContent;
    if (image === '/imageSelect.svg') {
      showModal('오류', '프로필 이미지가 선택되지 않았습니다');
      return;
    }
    if (!content || content === '내용을 수정해보세요') {
      showModal('오류', '이름을 입력해주세요');
      return;
    }

    try {
      await axios.post('http://darkchapter-back.herokuapp.com/profile/detail/registry', {
        token,
        id,
        image,
        content,
      });
      showModal('성공', '성공적으로 내용을 추가했습니다', () => {
        Router.push('/profiles');
      });
    } catch (err) {
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
      <Navigation />
      <div className="modal">
        <label htmlFor="file">
          <img className="image" src={image} alt="profileImage" />
          <input type="file" id="file" accept="image/*" onChange={ImageSelect} />
        </label>
        <span contentEditable className="content" id="content">
          내용을 수정해보세요
        </span>
        <span className="uploader" id="uploader" />
      </div>
      <Button className="upload" onClick={Registry}>
        Upload
      </Button>

      <style jsx>
        {`
          .modal {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #2b2b2b;
            border-radius: 36px;
            box-shadow: 3px 3px 8px #000000aa, -2px -2px 8px #808080aa;
            max-width: 1060px;
            width: 70%;
            height: 70%;
            text-align: justify;
            overflow-x: hidden;
            overflow-y: auto;
          }

          .image {
            width: 30%;
            margin-left: 80px;
            margin-top: 50px;
          }

          .content {
            position: absolute;
            font-size: 20px;
            margin-left: 40px;
            margin-top: 120px;
            margin-right: 50px;
            word-break: break-all;
          }

          .uploader {
            position: absolute;
            font-size: 30px;
            margin-left: 40px;
            margin-top: 50px;
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
            bottom: 30px;
            width: 200px !important;
            font-size: 25px !important;
            transform: translate(-50%);
          }
        `}
      </style>
    </>
  );
};

export default detail;
