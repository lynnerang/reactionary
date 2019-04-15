import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import Home from './Home.js';
// import Play from './Play.js';
// import MyCards from './MyCards.js';
// import Stats from './Stats.js';
// import Links from './Links.js';


ReactDOM.render(
  (<BrowserRouter>
    <App />
  </BrowserRouter>),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

