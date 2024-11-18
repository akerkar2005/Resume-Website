import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';  // Import useNavigate
import './Home.css';
import './TextAppear.css';
import './Button.css';

function Home({ onExpand }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const navigate = useNavigate();  // Hook for navigation
    const location = useLocation();  // Hook to get current location/path

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpanded(true); // Start the expansion animation
            if (onExpand) onExpand(); // Notify parent (App) to hide terminal
        }, 500); // Delay to trigger animation (adjust as needed)

        return () => clearTimeout(timer); // Clean up the timer
    }, [onExpand]);

    const handleHomeClick = () => {
        setIsComplete(true); // Mark the terminal process as complete (to trigger collapse)
        
        // Wait for the collapse to finish, then navigate to /contact
        setTimeout(() => {
            navigate('/home');  // Navigate to /contact after collapsing
        }, 1000);  // This delay should match the collapse duration
    };

    return (
        <div className={`main-page-wrapper ${isExpanded ? 'expanded' : ''}`}>
            <div className="main-content">
                <div className="sticky-header">
                    <div className="terminal-header">
                        <div className="window-buttons">
                            <div className="window-button"></div> {/* Close button */}
                            <div className="window-button"></div> {/* Minimize button */}
                            <div className="window-button"></div> {/* Maximize button */}
                        </div>
                        <div className="header-title">Atharva Kerkar's Website</div> {/* Dynamically update the header */}
                    </div>
                    <nav className="nav">
                        <ul className="nav-button">
                            <button 
                              className={`hover-btn ${scrolling ? 'scrolling' : ''} ${location.pathname === '/home' ? 'active' : ''}`} 
                              onClick={handleHomeClick}  // Collapse and navigate to Home page
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
                                className={`hover-btn ${scrolling ? 'scrolling' : ''}`}
                                onClick={() => navigate('/skills')}
                            >
                                <a>Projects</a>
                            </button>
                            <button 
                                className={`hover-btn ${scrolling ? 'scrolling' : ''} ${location.pathname === '/contact' ? 'active' : ''}`}
                                onClick={() => navigate('/contact')}
                            >
                                <a>Contact</a>
                            </button>
                        </ul>
                    </nav>
                </div>
                <h1>Welcome to My Website</h1>
                <p>Here is the main page content.</p>
            </div>
        </div>
    );
}

export default Home;
