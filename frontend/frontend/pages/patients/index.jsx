import React, { useState, useEffect } from "react";
import LoginLayout from "../../components/LoginLayout";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import LoginStyles from "../../styles/LoginModal.module.scss";
import styles from "../../styles/PatientSelectionDialog.module.scss";
import { loadPatients, loginAsPatient } from "../../lib/slices/patients";
// import MainIcon from '../../icons/main-icon-big.svg';
// import { deconstruct } from '../../lib/utils';
// import ErrorComponent from '../../components/ErrorComponent';

const SelectPatient = (props) => {
  const patients = useSelector((state) => state.patientReducer?.patients);
  const [selectedPatient, selectPatient] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const newPatient = async () => {
    router.push("/patients/new");
  };

  const getPatients = async ()=>{
    try {

   await dispatch(loadPatients()).unwrap();
      
    } catch (error) {
      
    }
  }
  const submit = ()=>{
    dispatch(loginAsPatient(selectedPatient))
  }
  useEffect (()=>{getPatients()},[])

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
        {/* {[0, 1, 2]
          .map((i) => ({
            id: i,
            first_name: "patient",
            last_name: i,
          }))
          .map((p) => (
            <div key={p.id}>
              <input
                type="radio"
                className={`btn-check ${styles.btn}`}
                name="patientselect"
                id={`patient_select_${p.id}`}
                autoComplete="off"
                onChange={() => selectPatient(p.id)}
                checked={selectedPatient === p.id}
              />
              <label
                className={`btn btn-outline-primary align-items-center justify-content-center m-2 ${
                  styles.btn
                } ${styles.sbtn}  ${
                  selectedPatient === p.id ? styles["sbtn-checked"] : ""
                }`}
                htmlFor={`patient_select_${p.id}`}
              >
                {p.first_name} {p.last_name}
              </label>
            </div>
          ))} */}
        {patients?.map((p,index,arr) => (
            <div key={p.id}>
              <input
                type="radio"
                className={`btn-check ${styles.btn}`}
                name="patientselect"
                id={`patient_select_${p.id}`}
                autoComplete="off"
                onChange={() => selectPatient(p.id)}
                checked={selectedPatient === p.id}
              />
              <label
                className={`btn btn-outline-primary align-items-center justify-content-center m-2 ${
                  styles.btn
                } ${styles.sbtn}  ${
                  selectedPatient === p.id ? styles["sbtn-checked"] : ""
                }`}
                htmlFor={`patient_select_${p.id}`}
              >
                {p.first_name} {p.last_name}
              </label>
            </div>
          ))}

        <div className={`mt-2`}>
          <button
            className={`btn btn-outline-primary ${styles.btn} ${styles.btnsm} ${styles["text-light-blue"]}`}
            // onClick={() => {}}
            onClick={newPatient}
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
          onClick={submit}
          disabled={selectedPatient === null}
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
