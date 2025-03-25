// Loader.jsx
import React from 'react';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="photo-loader">
      <div className="loader-container">
        <div className="loader-lens">
          <div className="loader-aperture"></div>
          <div className="loader-reflection"></div>
        </div>
        <div className="loader-text">Loading Gallery...</div>
      </div>
    </div>
  );
};

export default Loader;