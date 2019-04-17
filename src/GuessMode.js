import React from 'react';
import './GuessMode.scss';
import CardArea from './CardArea.js';

function GuessMode(props) {
    return (
      <>
        <h3>Guess Mode</h3>
        <div className='instructions'>
          <p>Read the description below, and enter the term you think this describes. View the example if you'd like some extra help!</p>
        </div>
        <CardArea mode='Guess'
                  data={props.data}
                  myCards={props.myCards}
                  markCardUsed={props.markCardUsed}
                  updateGameCount={props.updateGameCount}
                  updateGuessCount={props.updateGuessCount}
                  checkHighScore={props.checkHighScore}
        />
      </>
    )
}

export default GuessMode;










