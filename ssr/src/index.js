import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');
hydrateRoot(root,<BrowserRouter><App /></BrowserRouter>)

reportWebVitals();

