import React, { Component } from 'react';
import './CardArea.scss';
import Card from './Card.js';
import Guess from './Guess.js';

const storage = JSON.parse(localStorage.getItem('remaining cards')) || [];

console.log(storage);

class CardArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      remainingCards: storage,
      randomIndex: 0,
      randomCard: {},
      hasTerm: this.props.mode !== 'guess' && this.props.mode !== 'choice'
    }
  }

  componentDidMount() {
    this.getCards();
  }

  getCards = () => {
    const cardList = [...this.props.data];
    this.setState({ cards: cardList }, () => {
      this.getRandomCard();
    })
  }

  getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * this.state.cards.length);
    const randomCard = this.state.cards[randomIndex];
    this.setState({randomCard: randomCard, randomIndex: randomIndex});
  }

  removeCard = () => {
    let updatedCards = this.state.cards;
    updatedCards.splice(this.state.randomIndex, 1);
    this.setState({remainingCards: updatedCards}, () => {
      localStorage.setItem('remaining cards', JSON.stringify(updatedCards));
    });
  }

  render() {
    let guess = !this.state.hasTerm
    ? <Guess mode={this.props.mode} 
             answer={this.state.randomCard.term} 
             getRandomCard={this.getRandomCard} 
             removeCard={this.removeCard}
      /> 
    : null
    
    let percent = (this.state.cards.length - this.state.remainingCards.length) / this.state.cards.length * 100;
    let style = { animationDelay: `-${percent}s` };
    
    return (
      <section className='card-area'>
        <Card hasTerm={this.state.hasTerm} 
              cardData={this.state.randomCard}
        />
        {guess}
        <article className='progress-area'>
          <p><span>{this.state.cards.length-this.state.remainingCards.length}</span> of <span>{this.props.data.length}</span> solved.</p>
          <div className='progress-chart' style={style}></div>
        </article>
      </section>
    )
  }
}

export default CardArea;