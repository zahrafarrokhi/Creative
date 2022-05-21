import React from 'react';
import styles from '../../styles/Login.module.scss';
import LoginLayout from '../../components/LoginLayout';

const Login = (props) =>

{
  return(
    // column => justify-content-center = h,  align-items-center = w ,w=100
   <div className={`d-flex flex-column  align-items-center w-100 justify-content-center ${styles.bg} `}>
     {/* e.preventDefault dont do default action */}
      <form  className={`d-flex flex-column w-100 ${styles.mdl}`} onSubmit={(e) => e.preventDefault()}>
       
          <div
            className={`d-flex align-items-center justify-content-center p-4 ${styles.mdl2}`}
          >
            <div
              className={`btn-group d-flex ${styles.btngrp}`}
              dir="rtl"
              role="group"
              aria-label="Status button group"
              onChange={() => ({})}
            >
              <div className="p-0 m-0 d-flex flex-grow-1 align-items-center justify-content-center">
                <input
                  dir="rtl"
                  type="radio"
                  className="btn-check"
                  name="statusbutton"
                  id="btnradiophonenumber"
                  // checked={}
                  onChange={() => ({})}
                  // value={}
                />
                <label
                   className={`${styles.btngrpbtn}  `}
                  
                  htmlFor="btnradiophonenumber"
                >
                  تلفن‌همراه
                </label>
              </div>
              <div className="p-0 m-0 d-flex flex-grow-1 align-items-center justify-content-center">
                <input
                  dir="rtl"
                  type="radio"
                  className="btn-check"
                  name="statusbutton"
                  id="btnradioemail"
                  // checked={}
                  onChange={() => ({})}
                  // value={}
                />
                <label
                  className={`${styles.btngrpbtn}  `}
                  htmlFor="btnradioemail"
                >
                  ایمیل
                </label>
              </div>
            </div>
         
        </div>
        <div className="row justify-content-around">
          <div
            className={`d-flex flex-column p-5 ${styles.modalcnt} w-100 align-items-center`}
          >
            <div className="align-items-right">
              <label
                className={`form-label ${styles['slow-transition']}`}
                htmlFor="inputValue"
              >
                {' '}
               
              </label>
              <input
                dir="ltr"
                id="inputValue"
                onChange={() => ({})}                
                // inputMode={}
                // placeholder={}   
                // maxLength={}
                // value={}
                className={`form-control ${styles.btnsm}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
         {/* error */}
        </div>
        <div className="row p-5 justify-content-around">
          <div
            className={`d-flex w-100 justify-content-center ${styles.modalcnt}`}
          >
            <button
              type="submit"
              className={`btn btn-primary ${styles.btn}`}
              onClick={()=>({})}
            >
              بعدی
            </button>
          </div>
        </div>
        <div className={styles.mdldummymargin} />
      </form>

   </div>
  )
}



// layout without return
Login.getLayout = (page) => (
  <LoginLayout backlink = {false} >{page}</LoginLayout>
  // or
  // <LoginLayout  >{page}</LoginLayout>
);

export default Login;

