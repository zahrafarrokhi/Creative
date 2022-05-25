import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Loading.module.scss';

const Loading = (props) => {
  const { isLoading } = props;

  return (
    <div className={`d-flex justify-content-center align-items-center ${
		  styles.cnt
    } ${
		  isLoading ? '' : 'd-none'
    }`}
    >
      <ReactLoading type="spin" width="20%" height="20%" color="#79c943" />
    </div>
  );
};

export default Loading;