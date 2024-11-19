import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import './TextAppear.css';
import './Button.css';
import img from '../assets/portrait.jpg';


function AlternatingColorTitle({ text }) {
    // Split the text into words
    const words = text.split(' ');
  
    return (
      <h1>
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
    const [stars, setStars] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const headerRef = useRef(null);
    const bodyRef = useRef(null);
    const lastScrollTopRef = useRef(0);
    const lastScrollTimeRef = useRef(0);
    const scrollTimeoutRef = useRef(null);
    const indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';  // 4 spaces
    const myText = `he/him${indent}${indent}${indent}//${indent}${indent}${indent}CS @Purdue${indent}${indent}${indent}//${indent}${indent}${indent}Software Dev`;
    const bodyText = "Hello! My name is Atharva Kerkar, and I'm a sophomore majoring in Computer Science with a minor in Economics at Purdue University.\nI am passionate about software development, " + 
                    "and my ultimate career goal is to become a Sales Engineer. This role perfectly aligns with my interests, as it combines my technical expertise with my fascination for problem-solving and communication. " +
                    "I have a strong foundation in data structures and algorithms and am eager to apply them to real-world challenges. My ambition is to work with an innovative startup, where I can contribute my technical skills " +
                    "and collaborate with a dynamic team to refine my programming abilities.\n\nThank you for viewing my personal website. Feel free to contact me and have a great day. BOILER UP!";


    const handleScroll = () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const now = Date.now();

        // Track the scroll speed (difference in scroll position / time)
        const scrollSpeed = currentScroll - lastScrollTopRef.current;
        const scrollDuration = now - lastScrollTimeRef.current;

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
            }, 500); // Reset zoom effect after scrolling stops
            handleScroll();
        };

        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    // Add stars periodically
    useEffect(() => {
        const addStarInterval = setInterval(() => {
            setStars((prevStars) => [
                ...prevStars,
                {
                    id: Date.now(),
                    size: Math.random() > 0.6 ? 'large' : Math.random() > 0.3 ? 'medium' : 'small',
                    x: Math.random() * 100,
                    y: 100,
                },
            ]);
        }, 299);

        return () => clearInterval(addStarInterval); // Cleanup the interval
    }, []);

    // Move stars upward and remove those that leave the container
    useEffect(() => {
        const moveStarInterval = setInterval(() => {
            setStars((prevStars) =>
                prevStars
                    .map((star) => ({ ...star, y: star.y - 0.05 }))
                    .filter((star) => star.y > -5)
            );
        }, 6);

        return () => clearInterval(moveStarInterval);
    }, []);

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
        }, 500);

        return () => clearTimeout(timer);
    }, [onExpand]);

    // Handle navigation to Contact page
    const handleContactClick = () => {
        setIsComplete(true);
        setTimeout(() => {
            navigate('/contact');
        }, 1000); // Match the collapse duration
    };

    return (
        <div className={`main-page-wrapper ${isExpanded ? 'expanded' : ''}`}>
            {/* Terminal Header */}
            <div className="terminal-header">
                <div className="window-buttons">
                    <div className="window-button"></div>
                    <div className="window-button"></div>
                    <div className="window-button"></div>
                </div>
                <div className="header-title">Atharva Kerkar's Website</div>
            </div>

            {/* Main Content */}
            <div className="main-content" ref={bodyRef}>
                {/* Navigation Bar */}
                <div className="sticky-header" ref={headerRef}>
                    <nav className="nav">
                        <ul className="nav-button">
                            <button
                                className={`hover-btn ${location.pathname === '/home' ? 'active' : ''}`}
                                onClick={() => navigate('/home')}
                            >
                                <a>Home</a>
                            </button>
                            <button
                                className={`hover-btn ${location.pathname === '/skills' ? 'active' : ''}`}
                                onClick={() => navigate('/skills')}
                            >
                                <a>Skills</a>
                            </button>
                            <button
                                className={`hover-btn ${location.pathname === '/projects' ? 'active' : ''}`}
                                onClick={() => navigate('/projects')}
                            >
                                <a>Projects</a>
                            </button>
                            <button
                                className={`hover-btn ${location.pathname === '/contact' ? 'active' : ''}`}
                                onClick={handleContactClick}
                            >
                                <a>Contact</a>
                            </button>
                        </ul>
                    </nav>
                    <label className="hamburger-menu">
                        <input type="checkbox" />
                    </label>
                    <aside className="sidebar">
                        <ul className="nav-button">
                            <button
                                className={`hover-btn ${location.pathname === '/home' ? 'active' : ''}`}
                                onClick={() => {
                                    navigate('/home');
                                }}
                            >
                                Home
                            </button>
                            <button
                                className={`hover-btn ${location.pathname === '/skills' ? 'active' : ''}`}
                                onClick={() => navigate('/skills')}
                            >
                                Skills
                            </button>
                            <button
                                className={`hover-btn ${location.pathname === '/projects' ? 'active' : ''}`}
                                onClick={() => navigate('/projects')}
                            >
                                Projects
                            </button>
                            <button
                                className={`hover-btn ${location.pathname === '/contact' ? 'active' : ''}`}
                                onClick={handleContactClick}
                            >
                                Contact
                            </button>
                        </ul>
                    </aside>
                </div>

                {/* Resume Section with Stars */}
                <div className="resume-section">
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className={`star ${star.size}`}
                            style={{
                                left: `${star.x}%`,
                                top: `${star.y}%`,
                            }}
                        />
                    ))}
                    <div className="image-container">
                        <img src={img} alt="Profile Picture" />
                    </div>
                    <div className="content-container">
                        <AlternatingColorTitle text="Atharva Kerkar" />
                        <div className="info-container">
                            <p>he/him</p>
                            <p>//</p>
                            <p>CS @ Purdue</p>
                            <p>//</p>
                            <p>Software Dev</p>
                        </div>
                        <p>
                            {bodyText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
