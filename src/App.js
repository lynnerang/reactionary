import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Main from './Main.js';
import Navigation from './Navigation.js';
import reactTerms from './lynnerang.js';
import { timingSafeEqual } from 'crypto';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: reactTerms
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <div className='App-header-left'>
            <img className='App-logo' src={logo} alt='site logo'/>
            <h1><span>REACT</span>ionary</h1>
          </div>
          <div className='App-header App-header-right'>
          </div>
        </header>
        <div className='App-content'>
          <aside>
            <Navigation />
          </aside>
          <Main data={this.state.data}
                showExample={this.showExample}
          />
        </div>
      </div>
    );
  }
}

export default App;
