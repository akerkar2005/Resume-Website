import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import './TextAppear.css';
import './Button.css';
import './Skills.css';
import Particle from './Particle';
import CircularIcons from './CircularIcons';
import TermHeader from './TerminalHeader';

import python from '../assets/pythonblack.png';
import reacticon from '../assets/reactblack.png';
import java from '../assets/java.png';
import c from '../assets/C.png';
import cpp from '../assets/cpp.png';
import ts from '../assets/ts.png';
import StickyHeader from './StickyHeader';

function Contact({ onExpand }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const headerRef = useRef(null);
    const bodyRef = useRef(null);
    const lastScrollTopRef = useRef(0);
    const lastScrollTimeRef = useRef(0);
    const scrollTimeoutRef = useRef(null);
    const [particles, setParticles] = useState([]);
    const [textHeight, setTextHeight] = useState(0);
    const textRef = useRef(null);
    const title = "Atharva's Website";
    
    const [circleSize, setCircleSize] = useState(650); // Default size
    const [iconSize, setIconSize] = useState(120); // Default icon size
    const images = [python, java, cpp, c, ts];

    // Function to calculate sizes based on screen dimensions
    const calculateSizes = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Adjust circle size based on the smaller dimension (width or height)
        const newCircleSize = Math.min(screenWidth, screenHeight) * 0.7; // 80% of the smaller dimension
        const newIconSize = newCircleSize / 6.4; // Icons are proportional to the circle size

        setCircleSize(newCircleSize);
        setIconSize(newIconSize);
    };

    // Run the calculation on component mount and window resize
    useEffect(() => {
        calculateSizes(); // Initial calculation
        window.addEventListener('resize', calculateSizes); // Recalculate on resize

        return () => {
        window.removeEventListener('resize', calculateSizes); // Cleanup event listener
        };
    }, []);


    // Update the text height after the component has rendered
    useEffect(() => {
      if (textRef.current) {
        const height = textRef.current.offsetHeight + 500;
        setTextHeight(height); // Store height of the text
      }
    }, []);

    useEffect(() => {
        const numParticles = 20;
        let particlePositions = [];
    
        const textWidth = textRef.current.offsetWidth;
    
        // Generate random left positions between 20 and 80 and staggered delays
        for (let i = 0; i < numParticles; i++) {
          particlePositions.push({
            left: Math.random() * (100), // Random left position between 20 and 80
            delay: i/4, // Staggered delay
          });
        }
        
        setParticles(particlePositions);
    }, [textHeight]); // Re-run the effect whenever the text height changes
    

    useEffect(() => {
        if (isComplete) {
            console.log('Terminal processing complete. Collapsing terminal...');
            setTimeout(() => {
                setIsExpanded(false); // Collapse the terminal
            }, 100); // Duration of collapse (adjust as needed)
        }
    }, [isComplete]);    

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const now = Date.now();

        // Track the scroll speed (difference in scroll position / time)
        const scrollSpeed = currentScroll - lastScrollTopRef.current;

        // If scroll speed is fast (trackpad-like behavior), hide the header
        if (scrollSpeed > 100) {
            if (headerRef.current && bodyRef.current) {
                headerRef.current.classList.add('scrolled');
                bodyRef.current.classList.add('body-scrolled');
            }
        } else {
            if (headerRef.current && bodyRef.current) {
                headerRef.current.classList.remove('scrolled');
                bodyRef.current.classList.remove('body-scrolled');
            }
        }

        // Track the last scroll position and time
        lastScrollTopRef.current = currentScroll;
        lastScrollTimeRef.current = now;

        // Check if scrolling up too fast, hide the header completely
        if (scrollSpeed < 0 && currentScroll < 100) {
            headerRef.current.classList.add('hidden');
        } else {
            headerRef.current.classList.remove('hidden');
        }
    };

    // Detect scroll direction and apply dynamic effects
    useEffect(() => {
        const scrollHandler = () => {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                headerRef.current.classList.remove('zoom');
            }, 200); // Reset zoom effect after scrolling stops
            handleScroll();
        };

        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);


    const particleRef = useRef(null);

    const setProperty = (duration) => {
      if (particleRef.current) {
        particleRef.current.style.setProperty('--stop-y', `${duration}em`);
      }
    };
  
    const changeAnimationTime = () => {
      const animationDuration = Math.random();
      setProperty(animationDuration);
    };
  
    useEffect(() => {
      const interval = setInterval(changeAnimationTime, 10);
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, []);
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpanded(true); // Start the expansion animation
            if (onExpand) onExpand(); // Notify parent (App) to hide terminal
        }, 200);

        return () => clearTimeout(timer); // Clean up the timer
    }, [onExpand]);

    return (
        <div className={`main-page-wrapper ${isExpanded ? 'expanded' : ''}`}>
            {/* Terminal Header */}
            <TermHeader headerTitle={title} />
            <div className="contact-content" ref={bodyRef}>
                <StickyHeader
                    bodyRef={bodyRef}
                    setIsComplete={setIsComplete}
                />
                <div className="contact-background">
                    <div className="liquid-text-wrapper">
                        <h1 className="liquid-text" ref={textRef}>
                          Skills
                        </h1>
                    </div>

                    {/* Render the water droplets */}
                    {particles.map((particle, index) => (
                      <Particle ref={particleRef} key={index} left={particle.left} delay={particle.delay} textHeight={textHeight} />
                    ))}
                </div>
                
                <div className="skill-ui">
                    <CircularIcons
                        numIcons={images.length}
                        size={circleSize} // Dynamically calculated size
                        iconSize={iconSize} // Dynamically calculated icon size
                        images={images}
                        centerIcon={reacticon}
                    />
                </div>
                <footer className="footer">
                    <div className="rights">©2024 Atharva Kerkar</div>
                    <a href="https://github.com/akerkar2005" target="_blank" class="icon" rel="noopener noreferrer"></a>
                    <a href="https://www.linkedin.com/in/atharva-kerkar-58b4a5290/" target="_blank" class="linkedin" rel="noopener noreferrer">in</a>
                </footer>
            </div>
        </div>
    );
}

export default Contact;