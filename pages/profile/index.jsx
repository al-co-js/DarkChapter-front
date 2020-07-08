import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { render } from 'react-dom';

import { Detail, showDetail } from '../../components/Detail';
import { Registry } from '../../components/Detail/Registry';
import { closeLoading, Loading, showLoading } from '../../components/Loading';
import { showModal } from '../../components/Modal';
import Profile from '../../components/Profile';

const profile = () => {
  const router = useRouter();
  const { id } = router.query;

  let page = 1;
  let last = true;

  const addItem = async () => {
    try {
      showLoading();
      const profiles = await axios.get(
        `https://darkchapter-back.herokuapp.com/profile/get?page=${page}&limit=${10}`,
      );
      if (!profiles) {
        closeLoading();
        return;
      }

      profiles.data.some((data) => {
        const item = (
          <Profile
            target={data.target}
            uploader={data.uploader}
            image={data.image}
            id={data._id}
          />
        );
        const cont = document.createElement('li');
        cont.className = 'profileItems';
        cont.style.width = '247px';
        cont.style.display = 'inline-block';
        cont.style.float = 'left';
        cont.style.marginLeft = '50px';
        cont.style.marginRight = '50px';
        cont.style.marginTop = '40px';
        cont.style.marginBottom = '30px';
        try {
          document.getElementById('profileList').appendChild(cont);
          const conts = document.getElementsByClassName('profileItems');
          render(item, conts[conts.length - 1]);
          return false;
        } catch (err) {
          return true;
        }
      });
    } finally {
      closeLoading();
    }
  };

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
          need: false,
        });
        if (!verified) {
          showModal('로그인이 필요한 작업입니다', 'ok', 'info', () => {
            Router.push('/login');
          });
          return;
        }
        addItem();
        window.addEventListener('scroll', async () => {
          if (last) {
            if (
              window.scrollY + document.documentElement.clientHeight
              === document.documentElement.scrollHeight
            ) {
              page += 1;
              try {
                await addItem();
              } catch (err) {
                closeLoading();
                last = false;
              }
            }
          }
        });
      } catch (err) {
        showModal('로그인이 필요한 작업입니다', 'ok', 'info', () => {
          Router.push('/login');
        });
      }
    };
    delegate();
  }, []);

  useEffect(() => {
    if (id) {
      showDetail(id);
    }
  }, [id]);

  return (
    <>
      <Loading />
      <Detail />
      <Registry />
      <ul id="profileList">
        <li>
          <Link href="/profile/registry">
            <img
              className="registry"
              src="/plus.svg"
              alt="registry"
            />
          </Link>
        </li>
      </ul>

      <style jsx>
        {`
          #profileList {
            position: absolute;
            list-style: none;
            width: 80%;
            top: 130px;
            left: 50%;
            transform: translate(-50%);
          }

          .registry {
            display: inline-block;
            width: 247px;
            float: left;
            margin-left: 50px;
            margin-right: 50px;
            margin-top: 80px;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default profile;
