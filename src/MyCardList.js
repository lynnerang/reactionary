import React from 'react';
import './MyCardList.scss';
import Card from './Card.js';

function MyCardList(props) {
  let list;
  props.mode === 'All' ? list = props.data.concat(props.myCards) 
  : list = props.myCards;
  
    return (
      <>
        {
          list.map(card => {
            return <Card key={card.id}
                         hasTerm={true} 
                         canDelete={props.canDelete} 
                         cardData={card}
                         deleteMyCard={props.deleteMyCard}
                   />
          })
        }
      </>
    )
}

export default MyCardList;