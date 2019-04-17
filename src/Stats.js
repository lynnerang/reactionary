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
        <div>
          <h3 className='stats-heading'>Guess Mode High Score</h3>
          <p>Your best Guess Mode game was answering {props.highScore.totalCards} questions with {props.highScore.guesses} guesses!</p>
        </div>
      </div>
      <div className='stat'>
        <div><i className='fas fa-trophy'></i></div>
        <div>
          <h3 className='stats-heading'>Choice Mode High Score</h3>
          <p>Your best Choice mode game was answering {props.highScore.totalCards} questions with {props.highScore.guesses} guesses!</p>
        </div>
      </div>
      <div className='stat'>
        <div><i className='fas fa-stream'></i></div>
        <div>
          <h3 className='stats-heading'>Most Cards Answered</h3>
          <p>The most cards you've answered in a single game is 0!</p>
        </div>
      </div>
    </>
  )
}

export default Stats;