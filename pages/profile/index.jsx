import axios from 'axios';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { render } from 'react-dom';

import { hideLoading, Loading, showLoading } from '../../components/Loading';
import { Detail, showDetail } from '../../components/New/Detail';
import { showModal } from '../../components/New/Modal';
import Profile from '../../components/New/Profile';

const profile = () => {
  const router = useRouter();
  const { id } = router.query;

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
        const verified = await axios.post('http://darkchapter-back.herokuapp.com/auth/verify', {
          token,
          need: true,
        });
        if (!verified) {
          showModal('로그인이 필요한 작업입니다', 'ok', 'info', () => {
            Router.push('/login');
          });
        }
      } catch (err) {
        showModal('로그인이 필요한 작업입니다', 'ok', 'info', () => {
          Router.push('/login');
        });
      }
    };
    delegate();
  });
  let page = 1;
  let last = true;

  const addItem = async () => {
    try {
      showLoading();
      const profiles = await axios.get(
        `http://darkchapter-back.herokuapp.com/profile/get?page=${page}&limit=${10}`,
      );
      if (!profiles) {
        hideLoading();
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
          hideLoading();
          return true;
        }
      });
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
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
            hideLoading();
            last = false;
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      showDetail(id);
    }
  });

  return (
    <>
      <Loading />
      <Detail />
      <ul id="profileList">
        <li>
          <a id="registryLink" href="/profiles/registry">
            <img className="registry" src="/plus.svg" alt="registry" />
          </a>
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
          }
        `}
      </style>
    </>
  );
};

export default profile;
