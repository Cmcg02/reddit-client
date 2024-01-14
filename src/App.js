import React from 'react';
import logo from './logo.svg';
import { Search } from './features/search/Search';
import { Post } from './features/posts/Posts';
import { Filter } from './features/filter/Filter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Search/>      
        <Filter/>
      </header>
      <main>
        <Post/>
      </main>

    </div>
  );
}

export default App;
