import React, { Component } from 'react';
import './CardArea.scss';
import Card from './Card.js';
import Guess from './Guess.js';


class CardArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      cardsLeft: [],
      randomCard: {},
      choices: ['', '', ''],
      hasTerm: this.props.mode !== 'guess' && this.props.mode !== 'choice',
      showDialog: false
    }
  }

  componentDidMount() {
    this.getCards();
  }

  getCards = () => {
    //can i concat directly?
    const appCards = this.props.data;
    const myCards = this.props.myCards || [];
    const cards = this.props.mode === 'guess' ? appCards.concat(myCards) : appCards;
    const left = JSON.parse(localStorage.getItem(`remaining ${this.props.mode} cards`)) || cards.map(card => card.id);
    this.setState({cards: cards, cardsLeft: left}, () => this.getRandomCard());
  }

  getRandomCard = () => { 
    let randomId = this.state.cardsLeft[Math.floor(Math.random() * this.state.cardsLeft.length)];
    let randomCard = this.state.cards.find(card => card.id === randomId);
    this.setState({randomCard: randomCard});
    if (this.props.mode === 'choice') {
      this.setState({choices: this.shuffle(randomCard.fakeAnswers.concat(randomCard.term))});
    }
  }

  removeCard = () => {
    let ids = [...this.state.cardsLeft];
    ids.splice(ids.indexOf(this.state.randomCard.id), 1);
    if (!ids.length) {
      setTimeout(() => this.endGame(), 2000);
    }
    this.updateCardsLeft(ids);
  }

  updateCardsLeft = ids => {
    this.setState({cardsLeft: ids});
    localStorage.setItem(`remaining ${this.props.mode} cards`, JSON.stringify(ids));
  }

  resetGame = () => {
    this.updateCardsLeft(this.state.cards.map(card => card.id));
    this.props.updateGuessCount(this.props.mode, 0);
    this.getCards();
  }

  endGame = () => {
    //build out for both, passing mode
    this.props.updateGameCount();
    this.props.checkHighScore(this.props.mode, this.state.cards.length);
    this.setState({showDialog: true});
    this.resetGame();
  }

  closeDialog = () => this.setState({showDialog: false});

  shuffle = array => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    const totalCards = this.state.cards.length;
    const cardsLeft = this.state.cardsLeft.length;
    let guess;
    let percent = (totalCards - cardsLeft) / totalCards * 100;
    if (percent === 100) {
      percent = 99.99;
    }
    const style = {animationDelay: `-${percent}s`};

      guess = 
       <Guess mode={this.props.mode} 
              answer={this.state.randomCard.term} 
              choices={this.state.choices}
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

      const card = this.state.randomCard && 
        <Card hasTerm={this.state.hasTerm} 
              canDelete={false} 
              cardData={this.state.randomCard}
        />

    return (
      <section className='card-area'>
        {dialog}
        {card}
        {guess}
        <div className='third-column'>
          <article className='progress-area'>
            <p><span>{totalCards - cardsLeft}</span> of <span>{totalCards}</span></p>
            <div className='progress-chart' style={style}></div>
          </article>
          <button type='button' className='reset-btn' onClick={this.resetGame}>Reset Game</button>
        </div>
      </section>
    )
  }
}

export default CardArea;