import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import './TextAppear.css';
import './Button.css';
import img from '../assets/portrait.jpg';

function Home({ onExpand }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [stars, setStars] = useState([]); // State to manage star positions
    const navigate = useNavigate();
    const location = useLocation();

    // Add stars periodically
    useEffect(() => {
        const addStarInterval = setInterval(() => {
            setStars((prevStars) => [
                ...prevStars,
                {
                    id: Date.now(),
                    size: Math.random() > 0.6 ? 'large' : Math.random() > 0.3 ? 'medium' : 'small',
                    x: Math.random() * 100, // Random horizontal position (0 to 100%)
                    y: 100, // Start at the bottom of the container
                },
            ]);
        }, 299); // Add a new star every 200ms

        return () => clearInterval(addStarInterval); // Cleanup the interval
    }, []);

    // Move stars upward and remove those that leave the container
    useEffect(() => {
        const moveStarInterval = setInterval(() => {
            setStars((prevStars) =>
                prevStars
                    .map((star) => ({ ...star, y: star.y - 0.05 })) // Move upward by 2% per frame
                    .filter((star) => star.y > -5) // Remove stars that leave the container (-5% is a buffer)
            );
        }, 6); // Update star positions every 50ms

        return () => clearInterval(moveStarInterval); // Cleanup the interval
    }, []);

    // Handle terminal collapse after completion
    useEffect(() => {
        if (isComplete) {
            setTimeout(() => {
                setIsExpanded(false); // Collapse the terminal
            }, 100);
        }
    }, [isComplete]);

    // Detect scrolling to toggle styles
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

        // Navigate to /contact after collapsing
        setTimeout(() => {
            navigate('/contact');
        }, 1000); // Match the collapse duration
    };

    // Generate button classes dynamically
    const getButtonClass = (path) => {
        return location.pathname === path ? 'active-btn' : '';
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
            <div className="main-content">
                {/* Navigation Bar */}
                <div className="sticky-header">
                    <nav className="nav">
                        <ul className="nav-button">
                            <button 
                                className={`hover-btn ${scrolling ? 'scrolling' : ''} ${location.pathname === '/home' ? 'active' : ''}`} 
                                onClick={() => navigate('/home')}
                            >
                                <a>Home</a>
                            </button>
                            <button 
                                className={`hover-btn ${scrolling ? 'scrolling' : ''} ${location.pathname === '/skills' ? 'active' : ''}`} 
                                onClick={() => navigate('/skills')}
                            >
                                <a>Skills</a>
                            </button>
                            <button 
                                className={`hover-btn ${scrolling ? 'scrolling' : ''} ${location.pathname === '/projects' ? 'active' : ''}`} 
                                onClick={() => navigate('/projects')}
                            >
                                <a>Projects</a>
                            </button>
                            <button 
                                className={`hover-btn ${scrolling ? 'scrolling' : ''} ${location.pathname === '/contact' ? 'active' : ''}`}
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
                            <button className={`hover-btn ${location.pathname === '/home' ? 'active' : ''}`} 
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
                        <h1>Atharva Kerkar</h1>
                        <p>Welcome to my resume section!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
