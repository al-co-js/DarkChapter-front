import React, { useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import Profile from './Profile';

const ProfileList = () => {
  let page = 1;
  let last = true;

  const addItem = async () => {
    const profiles = await axios.get(`http://localhost:4000/profile/get?page=${page}&limit=${10}`);
    if (!profiles) {
      return;
    }

    profiles.data.forEach((profile) => {
      const item = (
        <Profile target={profile.target} uploader={profile.uploader} image={profile.image} />
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
      document.getElementById('profileList').appendChild(cont);
      const conts = document.getElementsByClassName('profileItems');
      render(item, conts[conts.length - 1]);
    });
  };

  useEffect(() => {
    window.onload = () => {
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
              last = false;
            }
          }
        }
      });
    };
  });

  return (
    <>
      <ul id="profileList" />

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
        `}
      </style>
    </>
  );
};

export default ProfileList;
