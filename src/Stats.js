import React from 'react';
import './Stats.scss';

function Stats(props) {
  return (
    <>
      <h2>Stats</h2>
      <div className='stat'>
      <i className='fas fa-check-double'></i>
        <div>
          <h3 className='stats-heading'>Total Games Completed</h3>
          <p>You have completed a total of {props.gameCount} games!</p>
        </div>
      </div>
      <div className='stat'>
        <div><i className='fas fa-trophy'></i></div>
        <div></div>
        <div>
          <h3 className='stats-heading'>High Score</h3>
          <p>Your best game was answering {props.highScore.totalCards} questions with {props.highScore.guesses} guesses!</p>
        </div>
      </div>
    </>
  )
}

export default Stats;