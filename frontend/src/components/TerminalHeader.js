import React, { useState } from 'react';
import './TextAppear.css';
import buttonshow from '../assets/buttonshow.png';
import buttonhide from '../assets/buttonhide.png';

function TermHeader({ headerTitle }) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="terminal-header">
            <div>
                <img
                    className="terminal-icon"
                    src={isHovered ? buttonshow : buttonhide}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    alt="Terminal Icon"
                />
            </div>
            <div className="header-title">{headerTitle}</div> {/* Dynamically update the header */}
        </div>
    );
}

export default TermHeader;