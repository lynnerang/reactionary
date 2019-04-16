import React, { Component } from 'react';
import './CardArea.scss';
import Card from './Card.js';
import Guess from './Guess.js';

const storage = JSON.parse(localStorage.getItem('remaining cards')) || [];


class CardArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      remainingCards: storage,
      randomIndex: 0,
      randomCard: {},
      hasTerm: this.props.mode !== 'Guess' && this.props.mode !== 'Choice',
      showDialog: false
    }
  }

  componentDidMount() {
    this.getCards();
  }

  getCards = () => {
    let cardList = this.props.data.concat(this.props.myCards);
    this.setState({cards: cardList}, () => this.getRandomCard());
  }

  checkRemainingCards = (cardList) => {
    let remaining = this.state.remainingCards;

    cardList.forEach(card => {
      if (card.new) {
        remaining.push(card);
        this.props.markCardUsed(card.id);
      }
    });
    // console.log(remaining)
    // const allCardIds = this.state.cards.map(card => card.id);
    // console.log(this.state.cards.length, allCardIds)
    // remaining.forEach(card => {
    //   console.log(card)
    //   if (!allCardIds.includes(card.id)) {
    //     const index = remaining.findIndex(i => i.id === card.id);
    //     remaining.splice(index, 1);
    //   }
    // });
    this.updateRemainingCards(remaining);
  }

  getRandomCard = () => {
    if (!this.state.remainingCards.length) {
      this.updateRemainingCards(this.state.cards);
    } else {
      this.checkRemainingCards(this.state.cards); //took from getcards
    }

    const randomIndex = Math.floor(Math.random() * this.state.remainingCards.length);
    const randomCard = this.state.remainingCards[randomIndex];
    this.setState({randomCard: randomCard, randomIndex: randomIndex});
  }

  removeCard = () => {
    let updatedCards = [...this.state.remainingCards];
    updatedCards.splice(this.state.randomIndex, 1);
    if (updatedCards.length === 0) {
      setTimeout(() => {
        
        // updatedCards = [...this.state.cards]; //necessary?
        this.endGame();
        
      }, 2000);
    }
    // if (updatedCards.length > 1) {
    //   updatedCards.splice(this.state.randomIndex, 1);
    // } else {
    //   setTimeout(() => {
    //     updatedCards = [...this.state.cards]; //necessary?
    //     this.endGame();
    //     this.setState({showDialog: true});
    //   }, 2000);
    // }
    this.updateRemainingCards(updatedCards);
  }

  updateRemainingCards = (cards) => {
    this.setState({remainingCards: cards});
    localStorage.setItem('remaining cards', JSON.stringify(cards));
  }

  resetGame = () => {
    // this.updateRemainingCards([]);
    this.props.updateGuessCount(0);
    // this.getCards();
  }

  endGame = () => {
    this.props.updateGameCount();
    this.props.checkHighScore(this.state.cards.length);
    this.props.updateGuessCount(0);
    this.setState({showDialog: true});
    this.getCards();
  }

  closeDialog = () => {
    this.setState({showDialog: false});
  }

  render() {
    const totalCards = this.state.cards.length;
    const cardsLeft = this.state.remainingCards.length;
    
    let percent = (totalCards - cardsLeft) / totalCards * 100;
    if (percent === 100) {
      percent = 99.99;
    }

    const style = {animationDelay: `-${percent}s`};

    const guess = !this.state.hasTerm &&
       <Guess mode={this.props.mode} 
             answer={this.state.randomCard.term} 
             getRandomCard={this.getRandomCard} 
             removeCard={this.removeCard}
             updateGuessCount={this.props.updateGuessCount}
      /> 
    
    const dialog = this.state.showDialog && 
      <div className='popup'>
        <div className='round-end-dialog' onBlur={this.closeDialog}>
          <h2>Congratulations!</h2>
          <p>You have answered all flash cards.  The game has reset so you can replay any time you feel like brushing up!</p>
          <button type='button' onClick={this.closeDialog}>OK</button>
        </div>
      </div>;
    

    return (
      <section className='card-area'>
        {dialog}
        <Card hasTerm={this.state.hasTerm} 
              canDelete={false} 
              cardData={this.state.randomCard}
              removeCardFromRemaining={this.removeCardFromRemaining}
        />
        {guess}
        <article className='progress-area'>
          <p><span>{totalCards - cardsLeft}</span> of <span>{totalCards}</span> solved.</p>
          <div className='progress-chart' style={style}></div>
        </article>
      </section>
    )
  }
}

export default CardArea;