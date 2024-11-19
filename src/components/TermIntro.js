import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import TextAppear from './TextAppear';

function TermIntro() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [expandHome, setExpandHome] = useState(false);
    const [showTerminal, setShowTerminal] = useState(true); // Keep terminal visible across routes
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    const login = 'Last login: ' + currentDate.toDateString() + ' ' + currentDate.toLocaleTimeString() + ' on ttys011';
    const message = 'ssh akerkar@data.cs.purdue.edu\n';
    const output = '*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n' +
        '-                       Password-only logins have been disabled                      *\n' +
        '*         Use of Duo Mobile, a hardware token, or an SSH key pair now required       -\n' +
        '-        Duo Mobile: Enter your password followed by a comma followed by PUSH        *\n' +
        '*        Token: Enter your password followed by a comma followed by 6-digit code     -\n' +
        '*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n';
    const output2Date = new Date(currentDate.getTime() + 5000);
    const output2 = 'Last login: ' + output2Date.toDateString() + ' ' + output2Date.toLocaleTimeString() + ' from 420.56.13.37';
    const message2 = 'cd ~/akerkar/menu';
    const message3 = 'ls -la';
    const output3 = '-rw-r--r--@   1 akerkar  staff     2307497 Nov 14 22:31 (8) Home.html\n' +
        '-rw-r--r--@   1 akerkar  staff     2307497 Nov 14 22:32 (8) Skills.html\n' +
        '-rw-r--r--@   1 akerkar  staff     2307497 Nov 14 22:32 (8) Projects.html\n' +
        '-rw-r--r--@   1 akerkar  staff     2307497 Nov 14 22:33 (8) Contact.html\n';
    const message4 = 'clear';
    const finalmsgopen = 'open Home.html';


    useEffect(() => {
        if (expandHome) {
            console.log('Terminal is expanding...');
        }
    }, [expandHome]);
    


    const handleComplete = () => {
        console.log('Expanding terminal...');
        setExpandHome(true);
        setTimeout(() => {
            console.log('Navigating to /home');
            setShowTerminal(false);
            navigate('/home');
        }, 500);
    };
    

    return (
            <div className="container">
                {/* Terminal Wrapper */}
                {showTerminal && (
                        <TextAppear
                            commands={[
                                { message: login, type: 'instant' },
                                { message: message, type: 'typewriter' },
                                { message: output, type: 'instant' },
                                { message: output2, type: 'instant' },
                                { message: message2, type: 'typewriter' },
                                { message: message3, type: 'typewriter' },
                                { message: output3, type: 'instant' },
                                { message: message4, type: 'typewriter' },
                                { message: message4, type: 'clear' },
                                { message: finalmsgopen, type: 'typewriter' },
                                { message: finalmsgopen, type: 'clear' }
                            ]}
                            onComplete={handleComplete} // Navigate after text animation completes
                        />
                )}
            </div>
    );
}

export default TermIntro;
