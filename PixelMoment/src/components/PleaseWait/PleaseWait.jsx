import React from 'react';
import './PleaseWait.scss';

const PleaseWait = () => {
  return (
    <div className="please-wait-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Please Wait</p>
      <p className="loading-subtext">Processing your payment...</p>
    </div>
  );
}

export default PleaseWait;