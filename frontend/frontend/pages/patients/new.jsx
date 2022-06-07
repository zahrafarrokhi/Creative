import React, { useState, useEffect, useRef } from "react";
import LoginLayout from "../../components/LoginLayout";
import styles from "../../styles/PatientSelectionDialog.module.scss";
import { DatePicker } from "jalali-react-datepicker";
import { persianToEnglishDigits } from "../../lib/utils";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";

function newPatient() {
  const dispatch = useDispatch();
  const router = useRouter();
  // nationalId
  // const nationalId = useRef();
  const [nationalId, setnationalId] = useState();
  const [nationalIdValid, setNationalIdValid] = useState(false);
  // birthdate
  const [birthdate, setBirthDate] = useState();

  const submit = async (e) => {
    try {
      setError(false);
      await dispatch(
        addPatient({
          nationalId: persianToEnglishDigits(nationalId.current.value),
          dateOfBirth: birthdate,
        })
      ).unwrap();
      router.push("/patients/info");
    } catch (e) {
      setError(true);
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} className="mt-5">
      <div className="d-flex flex-row p-3 align-self-center align-items-center w-100">
        <h3 className="text-center align-self-center w-100">
          لطفا کد‌ملی و تاریخ تولد خود را وارد کنید.
        </h3>
      </div>
      <div className="d-flex flex-column p-3 align-self-center align-items-center w-100">
        <div className="align-items-right">
          <label className="form-label" htmlFor="nationalId">
            کدملی
          </label>
          <input
            dir="ltr"
            id="nationalId"
            // ref={nationalId}
            className="form-control"
            maxLength={10}
            value={nationalId}
            onChange={(e) => {
              setnationalId(e.target.value);
              setNationalIdValid(e.target.value.length === 10);
            }}
            inputMode="numeric"
          />
          {/* <h3>{idError}</h3> */}
        </div>
        <div className="align-items-right">
          <label className="form-label d-flex" htmlFor="birthDate">
            تاریخ تولد
          </label>

          <DatePicker
            value={birthdate}
            timePicker={false}
            onClickSubmitButton={({ value }) => setBirthDate(value)}
          />

          {/* <h3>{birthError}</h3> */}
        </div>

        {/* <ErrorComponent error={error} redErr={redErr} /> */}
      </div>
      <div
        className={`d-flex flex-row p-3 align-self-center ${styles.submit_div}`}
      >
        <button
          type="submit"
          className={`btn btn-primary flex-fill ${styles.btn}`}
          disabled={!(birthdate?.length > 0 && nationalIdValid)}
          onClick={submit}
        >
          مرحله‌ی بعد
        </button>
      </div>
      <div className={styles.mdldummymargin} />
    </form>
  );
}
newPatient.getLayout = (page) => (
  <LoginLayout backlink={false}>{page}</LoginLayout>
);

export default newPatient;
