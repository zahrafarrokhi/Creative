import React from 'react';
import LoginLayout from '../../components/LoginLayout';
import styles from '../../styles/loginLayout.module.scss';

const Login = (props) =>

{
  return(
    <h1>hellooooo</h1>
  )
}



// layout
Login.getLayout = (page) => (
  <LoginLayout backlink ={false} >{page}</LoginLayout>
  // or
  // <LoginLayout  >{page}</LoginLayout>
);

export default Login;

