import React, { useState, useEffect } from 'react';
import LoginLayout from "../../components/LoginLayout";
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
  return(
<div >
    
</div>)
}

SelectPatient.getLayout = (page) => (
  <LoginLayout backlink={false}>{page}</LoginLayout>
  // or
  // <LoginLayout  >{page}</LoginLayout>
);
export default SelectPatient;