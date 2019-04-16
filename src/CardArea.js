import React, { Component } from 'react';
import './CardArea.scss';
import Card from './Card.js';
import Guess from './Guess.js';


class CardArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      remainingCardIds: [],
      randomCard: {},
      hasTerm: this.props.mode !== 'Guess' && this.props.mode !== 'Choice',
      showDialog: false
    }
  }

  componentDidMount() {
    this.getCards();
  }

  getCards = () => {
    const total = this.props.data.concat(this.props.myCards);
    const remaining = JSON.parse(localStorage.getItem('remaining cards')) 
    || total.map(i => i.id);
    this.setState({cards: total, remainingCardIds: remaining}, () => {
      this.getRandomCard();
    })
  }

  getRandomCard = () => {
    const randomId = this.state.remainingCardIds[Math.floor(Math.random() * this.state.remainingCardIds.length)];
    const randomCard = this.state.cards.find(card => card.id === randomId);
    this.setState({randomCard: randomCard});
  }

  removeCard = () => {
    let updatedIds = [...this.state.remainingCardIds];
    updatedIds.splice(updatedIds.indexOf(this.state.randomCard.id), 1);
    if (updatedIds.length === 0) {
      setTimeout(() => this.endGame(), 2000);
    }
    this.updateRemainingCardIds(updatedIds);
  }

  updateRemainingCardIds = (ids) => {
    this.setState({remainingCardIds: ids});
    localStorage.setItem('remaining cards', JSON.stringify(ids));
  }

  resetGame = () => {
    this.updateRemainingCardIds(this.state.cards.map(card => card.id));
    this.props.updateGuessCount(0);
    this.getCards();
  }

  endGame = () => {
    this.props.updateGameCount();
    this.props.checkHighScore(this.state.cards.length);
    this.setState({showDialog: true});
    this.resetGame();
  }

  closeDialog = () => {
    this.setState({showDialog: false});
  }

  render() {
    const totalCards = this.state.cards.length;
    const cardsLeft = this.state.remainingCardIds.length;
    
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
          <p><span>{totalCards - cardsLeft}</span> of <span>{totalCards}</span></p>
          <div className='progress-chart' style={style}></div>
        </article>
      </section>
    )
  }
}

export default CardArea;