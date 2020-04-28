import React, { useEffect } from 'react';
import Router from 'next/router';

const logout = () => {
  useEffect(() => {
    Router.push('/');
  });

  return <></>;
};

export default logout;
