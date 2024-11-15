import React, { useState, useEffect, useRef } from 'react';
import './TextAppear.css';

function TextAppear({ commands = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [texts, setTexts] = useState([]); // Store all completed texts
    const [currentText, setCurrentText] = useState(''); // Text being typed out
    const [isExpanded, setIsExpanded] = useState(false); // Start with false for animation
    const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 });
    const [headerTitle, setHeaderTitle] = useState('atharvakerkar@pal-nat'); // Initial header title
    const textRef = useRef(null);
    const intervalRef = useRef(null);

    // Helper function for delay
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        // Delay the expansion of the wrapper to trigger animation
        const timer = setTimeout(() => {
            setIsExpanded(true); // After a small delay, set expanded to true
        }, 100); // 100ms delay (adjust if needed)

        return () => clearTimeout(timer); // Clean up the timeout
    }, []);

    useEffect(() => {
        const processCommand = async () => {
            if (currentIndex < commands.length) {
                const { message = '', type } = commands[currentIndex]; // Default to empty string
    
                // Apply delay for a specific command (e.g., third command)
                if (currentIndex === 2) {
                    setCurrentText('');
                    await delay(800); // Delay of 1000ms = 1 second
                }
                if (currentIndex == 6) {
                    await delay(2500);
                }
    
                if (type === 'instant') {
                    if (message) {
                        setTexts((prev) => [...prev, message]); // Add instant message without $
                    } else {
                        setTexts((prev) => [...prev, '']); // Add empty line for empty command
                    }
                    setCurrentIndex((prev) => prev + 1);
                } else if (type === 'typewriter' && message) {
                    let letterIndex = 0; // Reset letter index for new command
                    setCurrentText('$ '); // Start currentText with $
    
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
    
                    intervalRef.current = setInterval(() => {
                        if (letterIndex < message.length) {
                            setCurrentText((prev) => `$ ${message.slice(0, letterIndex + 1)}`);
                            letterIndex++;
                        } else {
                            clearInterval(intervalRef.current);
                            setTexts((prev) => [...prev, `$ ${message}`]);
                            setCurrentIndex((prev) => prev + 1);
                            setCurrentText('$ ');
                        }
                    }, 90); // Adjust typing speed
                } else if (type === 'clear') {
                    setTexts([]);
                    setCurrentText('$ ');
                    setCurrentIndex((prev) => prev + 1);
                    if (currentIndex === commands.length - 1) {
                        setCurrentText('');
                    }
                }
    
                // Dynamically change the headerTitle based on the currentIndex
                if (currentIndex === 2) {
                    setHeaderTitle('ssh akerkar@data.cs.purdue.edu');
                }
            }
        };
    
        processCommand();
    
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [currentIndex, commands]);
    

    useEffect(() => {
        if (textRef.current) {
            // Get the bounding rect of the current text
            const rect = textRef.current.getBoundingClientRect();
            const containerRect = textRef.current.parentElement.getBoundingClientRect();
            
            // Calculate the cursor's vertical position based on the container's padding and text's bounding rect
            const cursorX = rect.right - containerRect.left - 1;  // Horizontal position of the cursor
            const cursorY = rect.top - containerRect.top;  // Adjust vertical position based on container

            setCursorPosition({
                left: cursorX,
                top: cursorY
            });
        }
    }, [texts, currentText]);

    const cursorStyle = {
        position: 'absolute',
        left: cursorPosition.left,
        top: cursorPosition.top,
        color: 'rgb(54, 229, 150)',
        animation: 'blink-caret 1s step-start infinite',
    };

    return (
        <div className={`terminal-wrapper ${isExpanded ? 'expanded' : ''}`}>
            <div className="terminal-header">
                <div className="window-buttons">
                    <div className="window-button"></div> {/* Close button */}
                    <div className="window-button"></div> {/* Minimize button */}
                    <div className="window-button"></div> {/* Maximize button */}
                </div>
                <div className="header-title">{headerTitle}</div> {/* Dynamically update the header */}
            </div>
            <div className="terminal-box">
                {texts.map((t, index) => (
                    <p key={index} style={{ margin: 0 }}>{t}</p> // Each command on a new line
                ))}
                <p style={{ margin: 0, display: 'inline' }} ref={textRef}>
                    {currentText}
                    <span className="cursor" style={cursorStyle}>|</span>
                </p>
            </div>
        </div>
    );
}

export default TextAppear;
