import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Confirm.module.scss";
import LoginLayout from "../../components/LoginLayout";
import VerificationInput from "react-verification-input";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GrRefresh } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { persianToEnglishDigits } from "../../lib/utils";

const CODE_LENGTH = 4;
const EXP_TIME = 120;

const Confirm = () => {
  const [code, setCode] = useState("");
  const [time, setTime] = useState(EXP_TIME);
  const [error, setError] = useState(false);
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  //
  // export const M_PHONE_NUMBER = 'phone_number';
  // export const M_EMAIL = 'email';
  const method = useSelector((state) => state.authReducer.method);
  // 0912... or email@...
  const username = useSelector((state) => state.authReducer.username);
  const user = useSelector((state) => state.authReducer?.me);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const timerInterval = setInterval(() => {
      if (time > 0) setTime((t) => (t > 0 ? t - 1 : t));
      else clearInterval(timerRef.current);
    }, 1000);
    timerRef.current = timerInterval;
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // useEffect(() => {
  // 	console.log(method, user)
  // 	if (user && !(user[method] && user[`${method}_verified`])) return;
  //   if (user && user.type === "patient") router.push("/patients/");
  //   else if (user && user.type === "doctor") router.push("/doctor/");
  //   else if (user && user.type === "support") router.push("/support/");
  //   else if (user && user.type === "pharmacy") router.push("/pharmacy/list/");
  //   else if (user && user.type === "laboratory") router.push("/laboratory/list/");
  //   else if (user && user.type === "assistant") router.push("/doctor/");
  // }, [user]);

  const submit = async () => {
    try {
      console.log(code);
      await dispatch(
        // CallbackTokenSerializer
        login({ token: code, [method]: username })
      ).unwrap();
      // Or
      // if (method === "email")
      //   await dispatch(
      //     // CallbackTokenSerializer
      //     login({ token: code, email: username })
      //   ).unwrap();
      // else
      //   await dispatch(
      //     // CallbackTokenSerializer
      //     login({ token: code, phone_number: username })
      //   ).unwrap();
    } catch (e) {
      setError(true);
    }
  };

  const resendCode = async () => {
    if (time > 0) return;
    try {
      if (method === M_PHONE_NUMBER) {
        await dispatch(requestMobileOTP(username)).unwrap();
      } else {
        await dispatch(requestEmailOTP(username)).unwrap();
      }
      setTime(EXP_TIME);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className={`d-flex flex-column   flex-grow-1   ${styles.cnt}`}>
      <div className="d-flex  flex-column align-items-center">
        <div className={`d-flex flex-row  ${styles.titlephone}`}>
          لطفا کد ارسال شده به شماره
        </div>
        <div className={`d-flex flex-row ${styles.phone_num} `}>{username}</div>
        <div className={`d-flex flex-row  ${styles.titlephone}`}>
          وارد نمایید
        </div>
      </div>

      <div className={`d-flex flex-column mt-3 align-items-center  w-100 `}>
        {/* 
        In order to align label with inputs, we need a flex div with flex-column, that doesn't have w-100
         */}
        <div className="d-flex flex-column ">
          <div className={` ${styles.confirm_code}`}>کد تأیید</div>

          <VerificationInput
            length={CODE_LENGTH}
            placeholder=""
            validChars="0-9۰-۹"
            onChange={(e) => setCode(persianToEnglishDigits(e))}
            removeDefaultStyles
            autoFocus
            dir="ltr"
            classNames={{
              container: `d-flex flex-row justify-content-center ${styles.codecontainer}`,
              character: `rounded m-1 form-control ${styles.inpsingle}`,
              characterInactive: `rounded m-1 form-control ${styles.inpsingle} ${styles.inactive}`,
              characterSelected: `rounded m-1 form-control:focus form-control:active ${styles.inpsingle} ${styles.selected}`,
            }}
          />
        </div>

        {/* <Button
          variant="contained"
          sx={{
            width: " 260px",
            boxShadow: "2px 2px 14px rgba(0, 0, 0, 0.07)",
            borderRadius: " 0.5em",
            padding: "0.5em",
            marginTop: "0.75em",
            [theme.breakpoints.down("md")]: {
              width: "230px",
            },
          }}
        >
          ادامه
        </Button> */}
        <div className="d-flex flex-column">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submit}
            disabled={time === 0 || code.length !== 4}
          >
            مرحله‌ی بعد
          </button>
          <div
            className={` m-3 d-flex  flex-row justify-content-between ${styles.refreshcnt}`}
          >
            <div
              className={`d-flex  ${styles.resendcode}`}
              onClick={resendCode}
              disabled={time !== 0}
            >
              ارسال مجدد
            </div>
            <div className="d-flex align-items-center ">
              <GrRefresh className={`${styles.refresh}`} />
              {/* 90 => floor(1.5) -> 1 =>str(1)=>'1 */}
              {/* '1'.padStart(2, '0') = '01' */}
              {String(Math.floor(time / 60)).padStart(2, "0")}:
              {/*90 %60 =>30 =>'30' =>   */}
              {/* 01:30*/}
              {String(time % 60).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// layout
Confirm.getLayout = (page) => {
  return <LoginLayout backlink={true}> {page} </LoginLayout>;
};
export default Confirm;
