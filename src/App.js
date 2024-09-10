// src/App.js
import React from 'react';
import './App.css';
import NewsFetcher from './components/NewsFetcher';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Daily News</h1>
      </header>
      <NewsFetcher />
    </div>
  );
}

export default App;
