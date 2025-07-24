import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TextAppear.css';
import TermHeader from './TerminalHeader.js';

function TextAppear({ commands = [], onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [texts, setTexts] = useState([]); // Store all completed texts
    const [currentText, setCurrentText] = useState(''); // Text being typed out
    const [isExpanded, setIsExpanded] = useState(false); // Start with false for animation
    const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 });
    const [headerTitle, setHeaderTitle] = useState('atharvakerkar@pal-nat'); // Initial header title
    const [directory, setDirectory] = useState('$ '); // Initial directory
    const [isComplete, setIsComplete] = useState(false); // New state to track completion
    const textRef = useRef(null);
    const intervalRef = useRef(null);

    // Helper function for delay, now wrapped in useCallback to avoid dependency warning
    const delay = useCallback((ms) => new Promise(resolve => setTimeout(resolve, ms)), []);

    // Move typewriterEffect above useEffect so it's defined before use
    const typewriterEffect = useCallback(async (message) => {
        setCurrentText(directory); // Set the initial text to the directory

        // Loop through each character and simulate typing
        for (let i = 0; i < message.length; i++) {
            setCurrentText((prev) => directory + message.slice(0, i + 1)); // Add one letter at a time
            await delay(80); // Wait 80ms between characters
        }

        // Once all letters are typed, add the full message to the text area
        setTexts((prev) => [...prev, directory + message]);
        setCurrentText(directory); // Reset the current text after typing finishes
        if (currentIndex === commands.length - 2) {
            await delay(400);
        }
    }, [directory, currentIndex, commands.length, delay]);

    useEffect(() => {
        if (isComplete) {
            console.log('Terminal processing complete. Collapsing terminal...');
            setTimeout(() => {
                setIsExpanded(false); // Collapse the terminal
            }, 10); // Optional delay to show a brief "complete" state
        }
    }, [isComplete]);    

    useEffect(() => {
        // Delay the expansion of the wrapper to trigger animation
        const timer = setTimeout(() => {
            console.log("expanding")
            setIsExpanded(true); // After a small delay, set expanded to true
        }, 300); // 100ms delay (adjust if needed)
        return () => clearTimeout(timer); // Clean up the timeout
    }, []);

    const isProcessingRef = useRef(false); // Prevent overlapping execution
    const prev = useRef(-1); // keeps track of the previous command index
    useEffect(() => {    
        const processCommand = async () => {
            if (currentIndex < commands.length && isProcessingRef.current === false && prev.current !== currentIndex) {
                console.log(prev.current);
                prev.current = currentIndex;
                isProcessingRef.current = true; // Lock execution
                console.log("current: " + currentIndex);
                const { message = '', type } = commands[currentIndex];

                if ((currentIndex === 3 && commands.length !== 10) || (currentIndex === 2 && commands.length === 10)) {
                    setCurrentText('');
                    setDirectory('atharva@data:~$ ');
                    await delay(800);
                }
                
                if ((currentIndex === 4 && commands.length !== 10) || (currentIndex === 3 && commands.length === 10)) {
                    setDirectory('atharva@data:~/atharva/menu$ ');
                }

                if ((currentIndex === 7 && commands.length !== 10) || (currentIndex === 6 && commands.length === 10)) {
                    await delay(2500);
                }


                if (type === 'instant') {
                    setTexts((prev) => [...prev, message]);
                    setCurrentIndex(currentIndex + 1); // Move to the next command
                }
                else if (type === 'typewriter' && message) {
                    setCurrentText(directory);
                    clearInterval(intervalRef.current);
                    console.log('typewrite');

                    await typewriterEffect(message); // Use async function for typewriter effect
                    setCurrentIndex(currentIndex + 1);
                    console.log('typewrite');

                } else if (type === 'clear') {
                    setTexts([]);
                    setCurrentText('$ ');
                    setCurrentIndex(currentIndex + 1);
                    if (currentIndex === commands.length - 1) {
                        setCurrentText('');
                        setIsComplete(true);
                        onComplete()
                    }
                }
                if ((currentIndex === 3 && commands.length !== 10) || (currentIndex === 2 && commands.length === 10)) {
                    setHeaderTitle('ssh atharva@data');
                }

                isProcessingRef.current = false; // Unlock execution
            }
        };

        processCommand();

        // Fix: copy ref to variable for cleanup
        const interval = intervalRef.current;
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [currentIndex, commands, directory, onComplete, typewriterEffect, delay]);

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
            <TermHeader headerTitle={headerTitle} />
            <div className="terminal-box">
                {texts.map((t, index) => (
                    <p key={index} style={{ margin: 0 }}>{t}</p> // Each command on a new line
                ))}
                <p style={{ margin: 0, display: 'inline' }} ref={textRef}>
                    {currentText}
                    {!isComplete && 
                        (<span 
                            className="cursor" 
                            style={cursorStyle}
                        >
                        | 
                        </span>)
                    }
                </p>
            </div>
        </div>
    );
}

export default TextAppear;
