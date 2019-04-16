import React from 'react';
import './MyCardList.scss';
import Card from './Card.js';

function MyCardList(props) {
    return (
      <>
        {
          props.myCards && props.myCards.map(card => {
            return <Card key={card.id}
                         hasTerm={true} 
                         canDelete={true} 
                         cardData={card}
                         deleteMyCard={props.deleteMyCard}
                   />
          })
        }
      </>
    )
}

export default MyCardList;