import React, { useState, useEffect } from 'react';
import './StickyHeader.css';
import './Button.css';

const Header = () => {
    const [scrolling, setScrolling] = useState(false);

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

    return (
        <div className='page-container'>
                <header className={`sticky-header ${scrolling ? 'scrolling' : ''}`}>
                    <nav className="nav">
                        <ul className="nav-button">
                            <button className={`hover-btn ${scrolling ? 'scrolling' : ''}`}>
                                <a>Home</a>
                            </button>
                            <button className={`hover-btn ${scrolling ? 'scrolling' : ''}`}>
                                <a>About</a>
                            </button>
                            <button className={`hover-btn ${scrolling ? 'scrolling' : ''}`}>
                                <a>Services</a>
                            </button>
                            <button className={`hover-btn ${scrolling ? 'scrolling' : ''}`}>
                                <a>Contact</a>
                            </button>
                        </ul>
                    </nav>
                </header>
                <div className='black-block'>
            </div>
        </div>
    );
}

export default Header;
