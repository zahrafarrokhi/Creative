import React from 'react';
import styles from '../styles/loginLayout.module.scss';
import { IoChevronBackCircle } from 'react-icons/io5';
// import { IoArrowBackCircleOutline } from 'react-icons/io5';
import {useRouter} from 'next/dist/client/router';

const LoginLayout = (props) => {
 const { children ,backlink} = props;
const router = useRouter();
  return(
   <div className={`d-flex flex-column align-items-center justify-content-center w-100 ${styles.maincnt}`}>
    <div className={`d-flex flex-colum w-100 ${styles.cnt}`}>
    <IoChevronBackCircle
          className={backlink ? styles.back_link : "d-none"}
          onClick={() => router.back()}
        />
       {children}
    </div>
   </div>
  )
}

export default LoginLayout;