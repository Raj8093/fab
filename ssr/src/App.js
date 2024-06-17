import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Company_Name } from './constants';
import { SearchApp } from './searchApp';
function App() {


  return (
    <div className="App">
      <header className="App-header">
        <div className='brand-name'>
          {Company_Name}
        </div>
      </header>
      <div className='App-content'>
      <SearchApp/>
      </div>
      <footer className='App-footer'>
        <div>Ⓒ 2024 Casa2 Stays Pvt. Ltd. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default App;
