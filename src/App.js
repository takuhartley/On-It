import React from 'react';
import Homepage from './Components/Homepage/Homepage'
import './App.css';

function App() {
  return (
    <div className="App">
    <Homepage />
    <nav>
      <ul>
        <li>Home</li>
        <li>Register</li>
        <li>Login</li>
      </ul>
    </nav>
    </div>
  );
}

export default App;
