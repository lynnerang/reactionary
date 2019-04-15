import React, { Component } from 'react';
import './CardArea.scss';
import Card from './Card.js';
import Guess from './Guess.js';

const storage = JSON.parse(localStorage.getItem('remaining cards')) || [];
const guessCount = JSON.parse(localStorage.getItem('guess count')) || 0;
const gameCount = JSON.parse(localStorage.getItem('game count')) || 0;
const highScore = JSON.parse(localStorage.getItem('high score')) || {totalCards: 0, guesses: 0};

class CardArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      cardTotal: 0,
      remainingCards: storage,
      randomIndex: 0,
      randomCard: {},
      guessCount: guessCount,
      gameCount: gameCount,
      highScore: highScore,
      hasTerm: this.props.mode !== 'Guess' && this.props.mode !== 'Choice',
      showDialog: false
    }
  }

  componentDidMount() {
    this.getCards();
  }

  getCards = () => {
    const cardList = this.props.data.concat(this.props.myCards);
    this.setState({cards: cardList, cardTotal: cardList.length}, () => this.getRandomCard());
  }

  getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * this.state.remainingCards.length);
    const randomCard = this.state.remainingCards[randomIndex];
    this.setState({randomCard: randomCard, randomIndex: randomIndex});
  }

  removeCard = () => {
    let updatedCards = this.state.remainingCards;

    if (updatedCards.length > 1) {
      updatedCards.splice(this.state.randomIndex, 1);
    } else {
      updatedCards = this.state.cards;
      this.endGame();
      this.setState({showDialog: true});
    }
    this.updateRemainingCards(updatedCards);
  }

  updateRemainingCards = (cards) => {
    this.setState({remainingCards: cards}, () => {
      localStorage.setItem('remaining cards', JSON.stringify(cards));
    });
  }

  updateGuessCount= () => {
    const newTotal = this.state.guessCount + 1;
    this.setState({guessCount: newTotal});
    localStorage.setItem('guess count', JSON.stringify(newTotal));
  }

  resetGuessCount = () => {
    this.setState({guessCount: 0});
    localStorage.setItem('guess count', JSON.stringify(0));
  }

  checkHighScore = () => {
    const highDiff =  this.state.highScore.guesses / this.state.highScore.totalCards;
    const currentDiff = this.state.guessCount / this.state.cards;

    currentDiff < highDiff && this.setState({highScore: {totalCards: this.state.cards, guesses: this.state.guessCount}}, () => {
      localStorage.setItem('high score', JSON.stringify(0));
    });
  }

  updateGameCount = () => {
    const gameCount = this.state.gameCount + 1;
    this.setState({gameCount: gameCount});
    localStorage.setItem('game count', JSON.stringify(gameCount));
  }

  endGame = () => {
    this.updateGameCount();
    this.checkHighScore();
    this.resetGuessCount();
  }

  closeDialog = () => {
    this.setState({showDialog: false});
  }

  render() {
    const totalCards = this.state.cards.length;
    const cardsLeft = this.state.remainingCards.length;
    const percent = (totalCards - cardsLeft) / totalCards * 100;
    const style = {animationDelay: `-${percent}s`};

    const guess = !this.state.hasTerm &&
       <Guess mode={this.props.mode} 
             answer={this.state.randomCard.term} 
             getRandomCard={this.getRandomCard} 
             removeCard={this.removeCard}
             updateGuessCount={this.updateGuessCount}
      /> 
    
    const dialog = this.state.showDialog && 
      <div className='popup'>
        <div className='round-end-dialog' onBlur={this.closeDialog}>
          <h2>Congratulations!</h2>
          <p>You have answered all <span>{totalCards}</span> cards using <span>{this.state.guessCount}</span> guesses.  The game has reset so you can replay any time you feel like brushing up!</p>
          <button type='button' onClick={this.closeDialog}>OK</button>
        </div>
      </div>;
    

    return (
      <section className='card-area'>
        {dialog}
        <Card hasTerm={this.state.hasTerm} 
              canDelete={false} 
              cardData={this.state.randomCard}
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