import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import './Button.css';
import img from '../assets/portrait.jpg';
import TermHeader from './TerminalHeader';
import StickyHeader from './StickyHeader.js';
import useFontSizeSetter from './fontSizeSetter.js';


function AlternatingColorTitle({ text }) {
    // Split the text into words
    const words = text.split(' ');
  
    return (
      <h1>
        {words.map((word, index) => {
            // Alternate colors based on the index
            const color = index % 2 === 0 ? 'color1' : 'color2';
            // returns two span elements with alternating colors
            // and the word inside
            return (
                <span key={index} className={color}>
                    {word}{' '}
                </span>
            );
        })}
      </h1>
    );
}

function Home({ onExpand }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const bodyRef = useRef(null);
    const title = "Atharva's Website";
    const bodyText = "I am a man studying Computer Science at Purdue University. I am minoring in Economics and Math.\nPlease feel free to reach out to me if you have any questions or would like to chat.\nAlso yeah, that poorly drawn head on the top left is supposed to be me with glasses.";
    // Handle terminal collapse after completion
    useEffect(() => {
        if (isComplete) {
            setTimeout(() => {
                setIsExpanded(false); // Collapse the terminal
            }, 100);
        }
    }, [isComplete]);

    // Expand the terminal initially
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpanded(true);
            if (onExpand) onExpand(); // Notify parent
        }, 200);

        return () => clearTimeout(timer);
    }, [onExpand]);

    useFontSizeSetter();

    return (
        <div className={`main-page-wrapper ${isExpanded ? 'expanded' : ''}`}>
            {/* Terminal Header */}
            <TermHeader headerTitle={title} />
            {/* Main Content */}
            <div className="main-content" ref={bodyRef}>
                <StickyHeader
                    bodyRef={bodyRef}
                    setIsComplete={setIsComplete}
                />
                <div className="resume-section">
                    <div className="image-container">
                        <img src={img} alt="Profile" />
                    </div>
                    <div className="content-container">
                        <AlternatingColorTitle text="Atharva Kerkar" />
                        <p>
                            {bodyText}
                        </p>
                        <div className="connect">
                            <a className="linkedin" href="https://www.linkedin.com/in/atharva-kerkar-58b4a5290/" target="_blank" rel="noopener noreferrer">
                                in
                            </a>
                            <a className="icon" href="https://github.com/akerkar2005" target="_blank" rel="noopener noreferrer">
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
