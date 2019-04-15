import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

function Navigation(props) {
    return (
      <nav className='App-navigation'>
          <NavLink className='nav-link' exact='true' to='/'><i class="fas fa-home"></i>Home</NavLink>
          <NavLink className='nav-link' to='/play'><i class="fas fa-play"></i>Play</NavLink>
          <NavLink className='nav-link' to='/mycards'><i class="far fa-copy"></i>My Cards</NavLink>
          <NavLink className='nav-link' to='/stats'><i class="fas fa-chart-pie"></i>Stats</NavLink>
          <NavLink className='nav-link' to='/links'><i class="fas fa-link"></i>Links</NavLink>
      </nav>
    )
}

export default Navigation;