import React, { useState, useEffect } from 'react';
import { deconstruct } from '../lib/utils';

const ErrorComponent = (props) => {
  const { error, redErr } = props;

  return (
    <>
      {error && (
      <div className="alert alert-danger align-items-right " role="alert">
        <div className="m-1 d-flex flex-column">
          {deconstruct(redErr).map((val) => (
            <div>{String(val)}</div>
          ))}
        </div>
      </div>
      )}
    </>
  );
};

export default ErrorComponent;