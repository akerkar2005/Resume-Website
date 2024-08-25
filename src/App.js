import React, { useState, useEffect } from 'react';
import './App.css';
import StickyHeader from './components/StickyHeader';
import './components/StickyHeader.css';


function App() {
  // List of messages to greet the user!
  const messages = [
    'Welcome',
    'Check Out My Resume',
    'Boiler Up!'
  ];

  const [message, setMessage] = useState('');

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  useEffect(() => {
    setMessage(getRandomMessage());
  }, []);
  

  return (
    <div className="App">
      <div>
        <StickyHeader>
        </StickyHeader>
        <link rel="stylesheet" href="App.css">
        </link>
        <div className='background-image'>
          <div className="text-overlay">
          <h1>{message}</h1>
          <p>Atharva Kerkar's Website</p>
      </div>
        </div>
        <p>
          jksdjalkdjsakldjaklsjkla

          djsakdjsad
          kdsakldjasl

          jkdlsajkdlsajkldas<br></br>
          jkdsjakdljsakldjsakldas<br></br>
          kjdkslajdkslajdklasjkdlsa<br></br>
        </p>
      </div>
    </div>
  );
}

export default App;
