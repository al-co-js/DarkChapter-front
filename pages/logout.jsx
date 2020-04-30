import React, { useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

const logout = () => {
  useEffect(() => {
    Cookies.remove('token');
    Router.push('/');
  });

  return <></>;
};

export default logout;
