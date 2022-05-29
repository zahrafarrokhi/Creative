import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useSelector, useDispatch } from 'react-redux';
// import { PlusOutlined } from '@ant-design/icons';
// import { loadPatients, loginAsPatient } from '../../lib/slices/patients';
// import { user } from '../../lib/authorize';
import LoginStyles from '../../styles/LoginModal.module.scss';
import styles from '../../styles/PatientSelectionDialog.module.scss';
// import MainIcon from '../../icons/main-icon-big.svg';
// import { deconstruct } from '../../lib/utils';
// import ErrorComponent from '../../components/ErrorComponent';

const SelectPatient = (props) => {
<div className={`row d-flex justify-content-center align-items-center ${LoginStyles.bg}`}>
      <div className={`d-flex d-md-none justify-content-md-center ${styles.mainicncnt}`}>
        {/* <MainIcon alt="کینیک غدد" className={`${styles.mainicn}`} /> */}
      </div>
      <div
        className={`d-flex flex-column shadow-lg p-5 mb-5 bg-white rounded align-items-around justify-content-between ${LoginStyles.mdl} `}
      >
        <div className="d-flex flex-row p-3 align-self-center align-items-center w-100">
          <h3 className="text-center align-self-center w-100">
            خوش‌آمدید، با انتخاب هر یک از کاربران قبلی وارد همان پروفایل شوید یا
            پروفایل جدید بسازید
          </h3>
        </div>
        <div
          className="d-flex flex-column p-3 align-self-center align-items-center"
          role="group"
          aria-label="Patient selection group"
        >
          {[1,2]?.map((p) => (
            <div key={p.id}>
              <input
                type="radio"
                className={`btn-check ${styles.btn} ${styles.btnsm}`}
                name="patientselect"
                id={`patient_select_${p.id}`}
                autoComplete="off"
                value={p.id}
                onChange={(e) => selectPatient(Number(e.target.value))}
                checked={''}
              />
              <label
                className={`btn btn-outline-primary align-items-center justify-content-center m-2 `}
                htmlFor={`patient_select_${p.id}`}
              >
                {p.first_name}
                {' '}
                {p.last_name}
              </label>
            </div>
          ))}
          <div className={`mt-2`}>
            <button
              className={`btn btn-outline-primary ${styles.btn} ${styles.btnsm} ${styles['text-light-blue']}`}
              // onClick={}
            >
              {/* <PlusOutlined className={`m-1 ${styles['plus-icon']}`} /> */}
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
        <div className={styles.mdldummymargin} />
      </div>
    </div>
}
export default SelectPatient;