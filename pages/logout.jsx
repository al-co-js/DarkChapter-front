import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect } from 'react';

const logout = () => {
  useEffect(() => {
    Cookies.remove('token');
    Router.push('/');
  }, []);

  return <></>;
};

export default logout;
