import axios from 'axios';
import React, { useEffect } from 'react';
import { render } from 'react-dom';

import { hideLoading, showLoading } from './Loading';
import Profile from './Profile';

const ProfileRank = () => {
  const page = 1;

  const addItem = async () => {
    showLoading();
    const profiles = await axios.get(
      `http://darkchapter-back.herokuapp.com/profile/get?page=${page}&limit=${5}`,
    );
    if (!profiles) {
      hideLoading();
      return;
    }

    profiles.data.forEach((profile, i) => {
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
      cont.style.marginTop = '60px';
      cont.style.marginRight = '300px';
      cont.style.marginBottom = '30px';
      if (i === 0) {
        cont.style.transform = 'scale(1.3)';
        cont.style.marginLeft = '50px';
      } else {
        cont.style.marginLeft = '-160px';
      }
      document.getElementById('profileList').appendChild(cont);
      const conts = document.getElementsByClassName('profileItems');
      render(item, conts[conts.length - 1]);
    });
    hideLoading();
  };

  useEffect(() => {
    addItem();
  });

  return (
    <>
      <ul id="profileList" />
      <a id="moreLink" href="/">
        <img className="more" id="more" alt="more" />
      </a>

      <style jsx>
        {`
          #profileList {
            position: absolute;
            list-style: none;
            width: 80%;
            height: 460px;
            top: 230px;
            left: 50%;
            transform: translate(-50%);
            overflow: hidden;
          }

          .more {
            position: absolute;
            cursor: pointer;
            right: 160px;
            z-index: 999;
          }

          #plus {
            top: 350px;
          }

          #dotdotdot {
            top: 430px;
          }
        `}
      </style>
    </>
  );
};

export default ProfileRank;
