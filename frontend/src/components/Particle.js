import React, { useRef } from 'react';
import './Projects.css';

const Particle = ({ left, delay, textHeight }) => {
  const particleRef = useRef(null);


  return (
    <div
      className="particle"
      ref={particleRef}
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        top: `${textHeight}px`, // Start the particles slightly lower than the text's bottom
      }}
    ></div>
  );
};

export default Particle;
