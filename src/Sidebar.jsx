import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar'; // Import the Sidebar component

function App() {
  return (
    <div className="App">
      <Sidebar /> {/* Render the Sidebar component */}
      <header className="App-header" style={{ marginLeft: '220px' }}> {/* Adjust margin */}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
