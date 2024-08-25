import React from "react";
import '../App.css';
import './Button.css';

const Button = () => {
    const buttonStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
        backdropFilter: 'blur(10px)', // Frosted glass effect
        border: '2px solid rgba(255, 255, 255, 0.5)', // Optional: Border to make the button visible
        color: '#fff', // Text color
        padding: '10px 20px', // Padding inside the button
        fontSize: '16px', // Font size
        cursor: 'pointer', // Pointer cursor on hover
        outline: 'none', // Remove default focus outline
        borderRadius: '8px', // Optional: Rounded corners
        transition: 'background-color 0.3s ease', // Smooth transition for background color
    };
}

export default Button