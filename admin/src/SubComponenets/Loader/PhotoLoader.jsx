import React from 'react';
import { Camera } from 'lucide-react';
import './PhotoLoader.scss';

const PhotoLoader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-icon">
          <div className="loader-pulse"></div>
          <Camera 
            className="camera-icon" 
            color="#ffffff" 
            size={120} 
            strokeWidth={1} 
          />
        </div>
        <div className="loader-bar"></div>
        <div className="loader-text">
          Loading Gallery
        </div>
      </div>
    </div>
  );
};

export default PhotoLoader;