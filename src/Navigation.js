import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

function Navigation(props) {
    return (
      <nav className='App-navigation'>
          <NavLink className='nav-link' exact={true} to='/'><i className="fas fa-home"></i>Home</NavLink>
          <NavLink className='nav-link' to='/play'><i className="fas fa-play"></i>Play</NavLink>
          <NavLink className='nav-link' to='/mycards'><i className="far fa-copy"></i>My Cards</NavLink>
          <NavLink className='nav-link' to='/stats'><i className="fas fa-chart-pie"></i>Stats</NavLink>
          <NavLink className='nav-link' to='/links'><i className="fas fa-link"></i>Links</NavLink>
      </nav>
    )
}

export default Navigation;