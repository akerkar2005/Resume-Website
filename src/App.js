import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import TermIntro from './components/TermIntro';
import Home from './components/Home';
import Contact from './components/Skills';


function App() {
    document.title = "Atharva's Website";
    const [showTerminal, setShowTerminal] = useState(false); // Control terminal visibility

    return (
        <Router>
            <AppWithBackground showTerminal={showTerminal} setShowTerminal={setShowTerminal} />
        </Router>
    );
}

function AppWithBackground({ showTerminal, setShowTerminal }) {
    const location = useLocation(); // useLocation within Router context

    return (
        <div className="App">
            
            {/* Main content */}
            {showTerminal && <TermIntro />}
            <Routes>
                <Route path="/terminal" element={<TermIntro onExpand={() => setShowTerminal(true)} />} />
                <Route path="/home" element={<Home onExpand={() => setShowTerminal(false)} />} />
                <Route path="/skills" element={<Contact onExpand={() => setShowTerminal(false)} />} />
                <Route path="/" element={<Navigate to="/terminal" replace />} />
                <Route path="*" element={<Navigate to="/terminal" replace />} />
            </Routes>
        </div>
    );
}

export default App;
