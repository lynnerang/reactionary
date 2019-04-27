import React from 'react';
import CardArea from './CardArea.js';

function ChoiceMode(props) {
    return (
      <>
        <h3>Choice Mode</h3>
        <div className='instructions'>
          <p>Read the description below, and click on the term to the right that you think this describes. View the example if you'd like some extra help!</p>
        </div>
        <CardArea mode='choice'
                  data={props.data}
                  markCardUsed={props.markCardUsed}
                  updateGameCount={props.updateGameCount}
                  updateGuessCount={props.updateGuessCount}
                  checkHighScore={props.checkHighScore}
        />
      </>
    )
}

export default ChoiceMode;










