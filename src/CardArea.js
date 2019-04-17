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
      choices: ['one', 'two', 'three'],
      hasTerm: this.props.mode !== 'Guess' && this.props.mode !== 'Choice',
      showDialog: false
    }
  }

  componentDidMount() {
    this.getCards();
  }

  getCards = () => {
    const appCards = this.props.data;
    const myCards = this.props.myCards || [];
    const combo = appCards.concat(myCards);
    const ids = combo.map(card => card.id);
    const remaining = JSON.parse(localStorage.getItem('remaining cards')) 
    || ids;
    this.setState({cards: combo, remainingCardIds: remaining}, () => {
      this.getRandomCard();
    })
  }

  getRandomCard = () => {
    const randomId = this.state.remainingCardIds[Math.floor(Math.random() * this.state.remainingCardIds.length)];
    const randomCard = this.state.cards.find(card => card.id === randomId);
    console.log(randomCard)
    this.setState({randomCard: randomCard, choices: randomCard.fakeAnswers.concat(randomCard.term)});
  }

  removeCard = () => {
    let updatedIds = [...this.state.remainingCardIds];
    updatedIds.splice(updatedIds.indexOf(this.state.randomCard.id), 1);
    if (!updatedIds.length) {
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
    console.log(this.state.remainingCardIds)
    const totalCards = this.state.cards.length;
    const cardsLeft = this.state.remainingCardIds.length;
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
        <article className='progress-area'>
          <p><span>{totalCards - cardsLeft}</span> of <span>{totalCards}</span></p>
          <div className='progress-chart' style={style}></div>
        </article>
      </section>
    )
  }
}

export default CardArea;