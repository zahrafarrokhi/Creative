import React, { useState } from "react";
import styles from "../../styles/Login.module.scss";
import LoginLayout from "../../components/LoginLayout";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

const Login = (props) => {
  // state
  const [state, setState] = useState("email");
  const [value, setValue] = useState();
  // error redux
  const [error, setError] = useState(false);
  // error validation 
  const [errorStr, setErrorStr] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const validate = () => {
    if (state === 'phonenumber') {
      return /^09\d{9}$/g.test(value);
    }
    return /^[.-\w]+@[.-\w]+\.[.-\w]+$/g.test(value);
  };

  const submit = async () => {
    setError(false);
    if (validate()) {
      // setError('');
      try {
        if (state === 'phonenumber') {
          await dispatch(requestMobileOTP(value)).unwrap();
        } else {
          await dispatch(requestEmailOTP(value)).unwrap();
        }
        router.push('/auth/confirm');
      } catch (e) {
        setError(true);
      }
    } else {
      setErrorStr('لطفا فیلد‌ها رادرست پر نمایید');
    }
  };
  // useEffect(() => {
  //   logout(dispatch);
  // }, []);
  return (
    // column => justify-content-center = h,  align-items-center = w ,w=100
    <div
      className={`d-flex flex-column  align-items-center w-100 justify-content-center ${styles.bg} `}
    >
      {/* e.preventDefault dont do default action */}
      <form
        className={`d-flex flex-column w-100 ${styles.mdl}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          className={`d-flex align-items-center justify-content-center p-4 ${styles.mdl2}`}
        >
          <div
            className={`btn-group d-flex ${styles.btngrp}`}
            dir="rtl"
            role="group"
            aria-label="Status button group"
            onChange={(e) => setState(e.target.value)}
          >
            <div className="p-0 m-0 d-flex flex-grow-1 align-items-center justify-content-center">
              <input
                dir="rtl"
                type="radio"
                className="btn-check"
                name="statusbutton"
                id="btnradiophonenumber"
                checked={state === "phonenumber"}
                onChange={() => ({})}
                value={"phonenumber"}
              />
              <label
                className={`${styles.btngrpbtn} ${
                  state === "phonenumber" ? styles["btngrpbtn-active"] : ""
                } `}
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
                checked={state === "email"}
                onChange={() => ({})}
                value={"email"}
              />
              <label
                className={`${styles.btngrpbtn}  ${
                  state === "email" ? styles["btngrpbtn-active"] : ""
                }`}
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
                className={`form-label ${styles["slow-transition"]}`}
                htmlFor="inputValue"
              >
                {state === 'phonenumber'?'تلفن همراه':'ایمیل'}
              </label>
              <input
                dir="ltr"
                id="inputValue"
                onChange={(e) => (setValue(e.target.value))}
                inputMode={state === 'phonenumber' ? 'numeric' : 'email'}
                placeholder={
                  state === 'phonenumber'
                    ? '09*********'
                    : 'email@example.com'
                }
                maxLength={state === 'phonenumber'? 11 : undefined}
                value={value}
                className={`form-control ${styles.btnsm}`}
              />
            </div>
          </div>
        </div>
        <div className="row">{/* error */}</div>
        <div className="row p-5 justify-content-around">
          <div
            className={`d-flex w-100 justify-content-center ${styles.modalcnt}`}
          >
            <button
              type="submit"
              className={`btn btn-primary ${styles.btn}`}
              // onClick={() => ({})}
              onClick={submit}
            >
              بعدی
            </button>
          </div>
        </div>
        <div className={styles.mdldummymargin} />
      </form>
    </div>
  );
};

// layout without return
Login.getLayout = (page) => (
  <LoginLayout backlink={false}>{page}</LoginLayout>
  // or
  // <LoginLayout  >{page}</LoginLayout>
);

export default Login;
