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
          <p>You have completed a total of <span>{props.gameCount}</span> games!</p>
        </div>
      </div>
      <div className='stat'>
        <div><i className='fas fa-trophy'></i></div>
        <div>
          <h3 className='stats-heading'>Highest Scores</h3>
          <p>Your best <span>Guess Mode</span> game was answering <span>{props.guessHighScore.totalCards}</span> questions with <span>{props.guessHighScore.guesses}</span> guesses!</p>
          <p>Your best <span>Choice mode</span> game was answering <span>{props.choiceHighScore.totalCards}</span> questions with <span>{props.choiceHighScore.guesses}</span> guesses!</p>
        </div>
      </div>
      <div className='stat'>
        <div><i className='fas fa-stream'></i></div>
        <div>
          <h3 className='stats-heading'>Most Cards Answered</h3>
          <p>The most cards you've answered in a single game is <span>{props.mostCardsAnswered}</span>!</p>
        </div>
      </div>
    </>
  )
}

export default Stats;