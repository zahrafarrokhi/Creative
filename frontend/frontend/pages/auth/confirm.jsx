import Rect from "react";
import styles from "../../styles/Confirm.module.scss";
import LoginLayout from "../../components/LoginLayout";
import VerificationInput from "react-verification-input";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GrRefresh } from "react-icons/gr";

const CODE_LENGTH = 4;
const EXP_TIME = 120;

const Confirm = () => {
  const theme = useTheme();
  return (
    <div className={`d-flex flex-column   flex-grow-1   ${styles.cnt}`}>
      <div className="d-flex  flex-column align-items-center">
        <div className={`d-flex flex-row  ${styles.titlephone}`}>
          لطفا کد ارسال شده به شماره
        </div>
        <div className={`d-flex flex-row ${styles.phone_num} `}>4555</div>
        <div className={`d-flex flex-row  ${styles.titlephone}`}>
          وارد نمایید
        </div>
      </div>

      <div className={`d-flex flex-column mt-3 align-items-center  w-100 `}>
        {/* 
        In order to align label with inputs, we need a flex div with justify-content-start, that doesn't have w-100
         */}
        <div className="d-flex flex-column align-self-center justify-content-start">
        <div className={` ${styles.confirm_code}`}>کد تأیید</div>

        <VerificationInput
          length={CODE_LENGTH}
          placeholder=""
          validChars="0-9۰-۹"
          // onChange={(e) => setCode(persianToEnglishDigits(e))}
          removeDefaultStyles
          autoFocus
          dir="ltr"
          classNames={{
            container: `d-flex flex-row justify-content-center ${styles.codecontainer}`,
            character: `rounded m-1 form-control ${styles.inpsingle}`,
            characterInactive: `rounded m-1 form-control ${styles.inpsingle} ${styles.inactive}`,
            characterSelected: `rounded m-1 form-control:focus form-control:active ${styles.inpsingle} ${styles.selected}`,
          }}
        /></div>

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
        <button
          className={`btn btn-primary mt-5 ${styles.btn}`}
          // onClick={submit}
          // disabled={time === 0 || code.length !== 4}
        >
          ادامه
        </button>
      </div>
    </div>
  );
};

// layout
Confirm.getLayout = (page) => {
  return <LoginLayout backlink={true}> {page} </LoginLayout>;
};
export default Confirm;
