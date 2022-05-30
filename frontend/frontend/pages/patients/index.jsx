import React, { useState, useEffect } from "react";
import LoginLayout from "../../components/LoginLayout";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
// import { loadPatients, loginAsPatient } from '../../lib/slices/patients';
// import { user } from '../../lib/authorize';
import LoginStyles from "../../styles/LoginModal.module.scss";
import styles from "../../styles/PatientSelectionDialog.module.scss";
// import MainIcon from '../../icons/main-icon-big.svg';
// import { deconstruct } from '../../lib/utils';
// import ErrorComponent from '../../components/ErrorComponent';

const SelectPatient = (props) => {
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center `}
    >
      <div className="d-flex flex-row justify-content-center align-items-center p-4">
        <h3 className={`text-center ${styles.fz}`}>
          خوش‌آمدید، با انتخاب هر یک از کاربران قبلی وارد همان پروفایل شوید یا
          پروفایل جدید بسازید
        </h3>
      </div>
      <div className={`d-flex flex-column p-3  align-items-center`}>
        {[0, 1, 2]?.map((p) => (
          <div key={p.id}>
            <input
              type="radio"
              className={`btn-check ${styles.btn}`}
              name="patientselect"
              id={`patient_select_${p.id}`}
              autoComplete="off"
            />
            <label
              className={`btn btn-outline-primary align-items-center justify-content-center m-2 ${styles.btn} ${styles.sbtn} `}
              htmlFor={`patient_select_${p.id}`}
            >
              {p.first_name} {p.last_name}
            </label>
          </div>
        ))}

        <div className={`mt-2`}>
          <button
            className={`btn btn-outline-primary ${styles.btn} ${styles.btnsm} ${styles["text-light-blue"]}`}
            onClick={() => {}}
          >
            <AiOutlinePlus className={`m-1 ${styles["plus-icon"]}`} />
            بیمار جدید
          </button>
        </div>
      </div>
      <div className="d-flex flex-row p-3 align-self-center">
        {/* <ErrorComponent error={error} redErr={redErr}/> */}
        <button
          type="submit"
          className="btn btn-primary flex-fill"
          // onClick={submit}
          // disabled={selectedPatient === null}
        >
          ورود
        </button>
      </div>
    </div>
  );
};

SelectPatient.getLayout = (page) => (
  <LoginLayout backlink={false}>{page}</LoginLayout>
  // or
  // <LoginLayout  >{page}</LoginLayout>
);
export default SelectPatient;
