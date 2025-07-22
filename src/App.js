import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TermIntro from './components/TermIntro';
import Home from './components/Home';
import Projects from './components/Projects';
import Page182 from './components/182';



function App() {
    document.title = "Atharva's Website";
    // Check localStorage for visit status (this is to determine if the 
    // terminal should be shown). I thought showing the terminal on first 
    // visit would be a good idea and annoying on subsequent visits, so I 
    // added this logic.
    const hasVisited = localStorage.getItem('hasVisited');
    const [showTerminal, setShowTerminal] = useState(!hasVisited);
    React.useEffect(() => {
        if (!hasVisited) {
            localStorage.setItem('hasVisited', 'true');
        }
    }, [hasVisited]);

    return (
        <Router>
            <AppWithBackground showTerminal={showTerminal} setShowTerminal={setShowTerminal} hasVisited={hasVisited} />
        </Router>
    );
}

function AppWithBackground({ showTerminal, setShowTerminal, hasVisited }) {
    // Decide default route based on visit status
    const defaultRoute = hasVisited ? "/home" : "/terminal";
    return (
        <div className="App">
            {/* Main content */}
            {showTerminal && <TermIntro />}
            <Routes>
                <Route path="/terminal" element={<TermIntro onExpand={() => setShowTerminal(true)} />} />
                <Route path="/home" element={<Home onExpand={() => setShowTerminal(false)} />} />
                <Route path="/projects" element={<Projects onExpand={() => setShowTerminal(false)} />} />
                <Route path="/182" element={<Page182 onExpand={() => setShowTerminal(false)} />} />
                <Route path="/" element={<Navigate to={defaultRoute} replace />} />
                <Route path="*" element={<Navigate to={defaultRoute} replace />} />
            </Routes>
        </div>
    );
}

export default App;
