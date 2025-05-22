import React, { useEffect, useState } from 'react';
import './CircularIcons.css'; // Import the CSS file

const CircleAnimation = ({ numIcons = 5, size = 200, iconSize = 40, images, centerIcon }) => {
  const radius = size / 2;
  const center = radius;

  const [positions, setPositions] = useState([]);
  const [angle, setAngle] = useState(0); // For rotating surrounding icons
  const [centerAngle, setCenterAngle] = useState(0); // For rotating the center icon

  useEffect(() => {
    const updatePositions = () => {
      const newPositions = [];
      for (let i = 0; i < numIcons; i++) {
        const angleDeg = (i * 360) / numIcons + angle;
        const angleRad = (angleDeg * Math.PI) / 180;

        const x = radius * Math.cos(angleRad) + center - iconSize / 2;
        const y = radius * Math.sin(angleRad) + center - iconSize / 2;

        newPositions.push({ x, y });
      }
      setPositions(newPositions);
    };

    const interval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 0.25) % 360); // Clockwise rotation for surrounding icons
    }, 20);

    updatePositions();

    return () => clearInterval(interval);
  }, [angle, numIcons, size, radius, center, iconSize]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterAngle((prevAngle) => (prevAngle - 0.25) % 360); // Counterclockwise rotation for the center icon
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="circle-container"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Center Icon rotating counterclockwise */}
      <div
        className="center-icon"
        style={{
          width: Math.max(size - 10, iconSize),
          height: Math.max(size - 10, iconSize),
          transform: `translate(-50%, -50%) rotate(${centerAngle}deg)`,
        }}
      >
        {centerIcon && <img src={centerIcon} alt="center-icon" />}
      </div>

      {/* Rotating Icons with Hover Animation */}
      {positions.map((position, index) => (
        <div
          key={index}
          className="rotating-icon"
          style={{
            width: iconSize,
            height: iconSize,
            left: position.x,
            top: position.y,
          }}
        >
          <img src={images[index]} alt={`icon-${index}`} />
        </div>
      ))}
    </div>
  );
};

export default CircleAnimation;