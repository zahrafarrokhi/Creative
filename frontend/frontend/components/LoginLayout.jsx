import React from 'react';
import styles from '../styles/loginLayout.module.scss';

const LoginLayout = (props) => {
 const { children} = props;

  return(
   <div className={`d-flex flex-column align-items-center justify-content-center w-100 ${styles.maincnt}`}>
    <div className={`d-flex flex-colum w-100 ${styles.cnt}`}>
       {children}
    </div>
   </div>
  )
}

export default LoginLayout;