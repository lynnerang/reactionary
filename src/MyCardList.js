import React, { Component } from 'react';
import './MyCardList.scss';
import Card from './Card.js';

class MyCardList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <>
        {
          this.props.myCards ? this.props.myCards.map(card => {
            return <Card key={card.id}
                         hasTerm={true} 
                         canDelete={true} 
                         cardData={card}
                         deleteMyCard={this.props.deleteMyCard} 
                   />
          }) : null
        }
      </>
    )
  }
}

export default MyCardList;