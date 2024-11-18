import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TermIntro from './components/TermIntro';
import Home from './components/Home';
import Contact from './components/Contact';

function App() {
    document.title = "Atharva's Website";
    const [showTerminal, setShowTerminal] = useState(false); // Control terminal visibility

    return (
        <div className="App">
            <Router>
                {showTerminal && <TermIntro />} {/* Terminal stays rendered */}
                <Routes>
                    <Route path="/terminal" element={<TermIntro onExpand={() => setShowTerminal(true)}/>} />
                    <Route path="/home" element={<Home onExpand={() => setShowTerminal(false)} />} />
                    <Route path="/contact" element={<Contact onExpand={() => setShowTerminal(false)} />} />
                    <Route path="/" element={<Navigate to="/terminal" replace />} />
                    <Route path="*" element={<Navigate to="/terminal" replace />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
