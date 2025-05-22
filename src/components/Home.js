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
      <h1 style={{ fontSize: 'var(--header-font-size)' }}>
        {words.map((word, index) => {
          // Alternate colors based on the index
          const color = index % 2 === 0 ? 'color1' : 'color2';
  
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
    const bodyText = "Hello! My name is Atharva Kerkar, and I'm a sophomore majoring in Computer Science with a minor in Economics at Purdue University.\n\nI am passionate about software development, " + 
                    "and my ultimate career goal is to become a Sales Engineer. This role perfectly aligns with my interests, as it combines my technical expertise with my fascination for problem-solving and communication. " +
                    "I have a strong foundation in data structures and algorithms and am eager to apply them to real-world challenges. " +
                    "\n\nThank you for viewing my personal website. Feel free to contact me and have a great day.";


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
                        <img src={img} alt="Profile Picture" />
                    </div>
                    <div className="content-container">
                        <AlternatingColorTitle text="Atharva Kerkar" />
                        <div className="info-container">
                            <p style={{ fontSize: 'var(--paragraph-font-size)' }}>he/him</p>
                            <p style={{ fontSize: 'var(--paragraph-font-size)' }}>//</p>
                            <p style={{ fontSize: 'var(--paragraph-font-size)' }}>CS @ Purdue</p>
                            <p style={{ fontSize: 'var(--paragraph-font-size)' }}>//</p>
                            <p style={{ fontSize: 'var(--paragraph-font-size)' }}>Software Dev</p>
                        </div>
                        <p style={{ fontSize: 'var(--paragraph-font-size)' }}>
                            {bodyText}
                        </p>
                    </div>
                </div>
                <footer className="footer">
                    <div style={{ fontSize: 'var(--footer-font-size)' }} className="rights">©2024 Atharva Kerkar</div>
                    <a style={{ transform: `scale(var(--icon-scale))` }} href="https://github.com/akerkar2005" target="_blank" class="icon" rel="noopener noreferrer"></a>
                    <a style={{ transform: `scale(var(--icon-scale))` }} href="https://www.linkedin.com/in/atharva-kerkar-58b4a5290/" target="_blank" class="linkedin" rel="noopener noreferrer">in</a>
                </footer>
            </div>
        </div>
    );
}

export default Home;
