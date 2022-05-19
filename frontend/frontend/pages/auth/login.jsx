import React from 'react';
import styles from '../../styles/Login.module.scss';
import LoginLayout from '../../components/LoginLayout';

const Login = (props) =>

{
  return(
    <h1>hellooooo</h1>
  )
}



// layout without return
Login.getLayout = (page) => (
  <LoginLayout backlink = {false} >{page}</LoginLayout>
  // or
  // <LoginLayout  >{page}</LoginLayout>
);

export default Login;

