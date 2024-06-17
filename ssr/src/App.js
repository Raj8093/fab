import logo from './logo.svg';
import './App.css';
import React from 'react';
import { SearchBar } from './components/searchBar';
import { Suggestions } from './components/suggestions';
import { Company_Name } from './constants';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='brand-name'>
          {Company_Name}
        </div>
      </header>
      <div className='App-content'>
      <SearchBar/>
      <Suggestions/>
      </div>
      <footer className='App-footer'>
        <div>Ⓒ 2024 Casa2 Stays Pvt. Ltd. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default App;
