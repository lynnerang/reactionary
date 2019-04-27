import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './Main.scss';
import Home from './Home.js';
import Play from './Play.js';
import MyCards from './MyCards.js';
import Stats from './Stats.js';
import Links from './Links.js';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myCards: [],
      gameCount: 0,
      guessGuesses: 0,
      choiceGuesses: 0,
      mostCardsAnswered: 0,
      guessHighScore: {totalCards: 0, guesses: 0},
      choiceHighScore: {totalCards: 0, guesses: 0}
    }
  }

  componentDidMount() {
    const myCards = JSON.parse(localStorage.getItem('my cards')) || [];
    const gameCount = JSON.parse(localStorage.getItem('game count')) || 0;
    this.getStatStorage('guess');
    this.getStatStorage('choice');
    this.setState({myCards: myCards, gameCount: gameCount});
  }

  getStatStorage = mode => {
    const highScore = JSON.parse(localStorage.getItem(`${mode} high score`)) || {totalCards: 0, guesses: 0};
    const totalGuesses = JSON.parse(localStorage.getItem(`${mode} guess count`)) || 0;
    this.setState({[`${mode}HighScore`]: highScore, [`${mode}Guesses`]: totalGuesses});
  }

  updateGameCount = () => {
    const gameCount = this.state.gameCount + 1;
    this.setState({gameCount: gameCount});
    localStorage.setItem('game count', JSON.stringify(gameCount));
  }

  updateGuessCount = (mode, inc) => {
    let total = inc === 'add' ? this.state[`${mode}Guesses`] + 1 : 0;
    this.setState({[`${mode}Guesses`]: total});
    localStorage.setItem(`${mode} guess count`, JSON.stringify(total));
  }

  checkHighScore = (mode, numCards) => {
    const numGuesses = this.state[`${mode}Guesses`];
    const highDiff =  this.state[`${mode}HighScore`].guesses / this.state[`${mode}HighScore`].totalCards;
    const currentDiff = numGuesses / numCards;

    if (!highDiff || currentDiff < highDiff) { 
      const newScore = {totalCards: numCards, guesses: numGuesses};
      this.setState({[`${mode}HighScore`]: newScore}, () => {
        localStorage.setItem(`${mode} high score`, JSON.stringify(newScore));
      });
    } 
    this.checkMostCardsAnswered(numCards);
  }

  checkMostCardsAnswered = (totalCards) => {
    if (totalCards > this.state.mostCardsAnswered) {
      this.setState({mostCardsAnswered: totalCards});
    }
  }

  saveNewCard = (term, desc, file) => {
    const newCard = {id: Date.now(), term: term, definition: desc, example: file, new: true};
    const myCards = this.state.myCards;
    myCards.unshift(newCard);
    this.updateMyCards(myCards);
    this.updateStorageRemainingCards(newCard.id, 'add');
  }

  deleteMyCard = cardId => {
    const updatedCards = this.state.myCards; 
    const deletedCard = updatedCards.find(card => card.id === cardId);
    updatedCards.splice(updatedCards.indexOf(deletedCard), 1);
    this.updateMyCards(updatedCards);
    this.updateStoredCardsLeft(deletedCard.id);
  }

  updateMyCards = myCards => {
    this.setState({myCards: myCards});
    localStorage.setItem('my cards', JSON.stringify(myCards))
  }

  updateStoredCardsLeft = (id, option) => {
    let remaining = JSON.parse(localStorage.getItem('remaining guess cards')) || [];
    if (option === 'add') {
      remaining.push(id);
    } else if (remaining.includes(id)) {
      remaining.splice(remaining.indexOf(id), 1);
    }
    localStorage.setItem('remaining guess cards', JSON.stringify(remaining));
  }

  markCardUsed = cardId => {
    const myCards = [...this.state.myCards];  
    const index = myCards.indexOf(myCards.find(card => card.id === cardId));
    myCards[index].new = false;
    this.updateMyCards(myCards);
  }

  render() {
    return (
        <main>
            <Switch>
              <Route path='/' exact render={(props) => (<Home />)}/>
              <Route path='/play' render={(props) => (
                <Play data={this.props.data} 
                      myCards={this.state.myCards}
                      updateGameCount={this.updateGameCount}
                      markCardUsed={this.markCardUsed}
                      checkHighScore={this.checkHighScore}
                      updateGuessCount={this.updateGuessCount}
                />
              )}/>
              <Route path='/mycards' render={(props) => (
                <MyCards data={this.props.data}
                        myCards={this.state.myCards}
                        saveNewCard={this.saveNewCard} 
                        deleteMyCard={this.deleteMyCard}
                />
              )}/>
              <Route path='/stats' render={(props) => (
                <Stats gameCount={this.state.gameCount}
                       guessHighScore={this.state.guessHighScore}
                       choiceHighScore={this.state.choiceHighScore}
                       mostCardsAnswered={this.state.mostCardsAnswered}
                />
              )}/>
              <Route path='/links' render={(props) => (<Links />)}/>
            </Switch>
        </main>
    )
  }
}

export default Main;