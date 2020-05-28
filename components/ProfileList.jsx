import axios from 'axios';
import React, { useEffect } from 'react';
import { render } from 'react-dom';

import { hideLoading, showLoading } from './Loading';
import Profile from './Profile';

const ProfileList = () => {
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

      profiles.data.some((profile) => {
        const item = (
          <Profile
            target={profile.target}
            uploader={profile.uploader}
            image={profile.image}
            _id={profile._id}
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
  });

  return (
    <>
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

export default ProfileList;
