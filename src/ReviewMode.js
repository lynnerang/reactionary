import React from 'react';
import './GuessMode.scss';
import MyCardList from './MyCardList.js';

function ReviewMode(props) {
    return (
      <>
        <h3>Review Mode</h3>
        <div className='instructions'>
          <p>Here are all the cards that you'll be shown when playing the other modes.  Use this mode to brush up on your skills, and then try your hand at the Guess and Choice modes!</p>
        </div>
        <div className='my-card-list'>
          <MyCardList mode='All'
                      data={props.data}
                      myCards={props.myCards}
                      canDelete={false}
          />
        </div>
      </>
    )
}

export default ReviewMode;










