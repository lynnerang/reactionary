import React, { Component } from 'react';
import './Navigation.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <nav className='App-navigation'>
        <ul>
          <li className='nav-items'>Home</li>
          <li className='nav-items'>Play</li>
          <li className='nav-items'>My Cards</li>
          <li className='nav-items'>Stats</li>
          <li className='nav-items'>Links</li>
        </ul>
      </nav>
    )
  }
}

export default Navigation;