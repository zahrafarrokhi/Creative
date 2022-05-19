import React from 'react';
import LoginLayout from '../../components/LoginLayout';

const login = () =>
{
  return(
    <h1>hellooooo</h1>
  )
}

// layout
login.getLayout = (page) => (
  <LoginLayout>{page}</LoginLayout>
);

export default login;

