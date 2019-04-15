import React from 'react';
import './Home.scss';
import icon from './images/flashicon.png';
import { NavLink } from 'react-router-dom';


function Home (props) {
    return (
      <>
        <h2>Home</h2>
        <div className='instructions'>
          <p>Welcome to Reactionary, the flash card app for studying up on your React terminology!  Here you can:</p>
        </div>
        <div className='home-layout'>
          <div className='home-options'>
            <div className='home-option'>
              <NavLink className='home-link' to='/play'>
                <h3 className='home-option-heading'>Play a Game!</h3>
                <p>Choose from multiple game styles, like entering a guess or choosing a guess from multiple choices.</p>
              </NavLink>
            </div>
            <div className='home-option'>
              <NavLink className='home-link' to='/mycards'>
                <h3 className='home-option-heading'>Make Your Own Flash Cards!</h3>
                <p>Create your very own flash cards that will be included in the Review and Guess Mode games.</p>
              </NavLink>
            </div>
            <div className='home-option'>
              <NavLink className='home-link' to='/stats'>
                <h3 className='home-option-heading'>View Your Stats!</h3>
                <p>See how many games you've played, what your overall top score is, and more.</p>
              </NavLink>
            </div>
            <div className='home-option'>
              <NavLink className='home-link' to='/links'>
                <h3 className='home-option-heading'>See Helpful React Resources!</h3>
                <p>Get links to a variety of great resources for brushing up on your React skills and knowledge.</p>
              </NavLink>
            </div>
          </div>
          <div className='home-image-area'>
            <img className='home-image' src={icon} alt='flashcards icon' />
          </div>
        </div>
      </>
    )
}

export default Home;










