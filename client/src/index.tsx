import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/styles.css';
import 'semantic-ui-css/semantic.min.css'
import App from './app/layout/App';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 <Router>  
    <App />
 </Router>

);

