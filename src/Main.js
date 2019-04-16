import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
      totalGuesses: 0,
      highScore: {totalCards: 0, guesses: 0}
    }
  }

  componentDidMount() {
    const myCards = JSON.parse(localStorage.getItem('my cards')) || [];
    const gameCount = JSON.parse(localStorage.getItem('game count')) || 0;
    const highScore = JSON.parse(localStorage.getItem('high score')) || {totalCards: 0, guesses: 0};
    const totalGuesses = JSON.parse(localStorage.getItem('guess count')) || 0;

    this.setState({
      myCards: myCards, 
      gameCount: gameCount, 
      highScore: highScore, 
      totalGuesses: totalGuesses
    });
  }

  updateGameCount = () => {
    const gameCount = this.state.gameCount + 1;
    this.setState({gameCount: gameCount});
    localStorage.setItem('game count', JSON.stringify(gameCount));
  }

  updateGuessCount = update => {
    let total = update === 'add' ? this.state.totalGuesses + 1 : 0;
    this.setState({totalGuesses: total});
    localStorage.setItem('guess count', JSON.stringify(total));
  }

  checkHighScore = (numCards) => {
    const numGuesses = this.state.totalGuesses;
    const highDiff =  this.state.highScore.guesses / this.state.highScore.totalCards;
    const currentDiff = numGuesses / numCards;

    if (!highDiff || currentDiff < highDiff) { 
      const newScore = {totalCards: numCards, guesses: numGuesses};
      this.setState({highScore: newScore}, () => {
        localStorage.setItem('high score', JSON.stringify(newScore));
      });
    } 
  }

  saveNewCard = (term, desc, file) => {
    const newCard = {id: Date.now(), term: term, definition: desc, example: file, new: true};
    const updatedCards = this.state.myCards;
    updatedCards.push(newCard);
    this.updateMyCards(updatedCards);
    this.updateStorageRemainingCards(newCard.id, 'add');
  }

  deleteMyCard = cardId => {
    const updatedCards = this.state.myCards; 
    const deletedCard = updatedCards.find(card => card.id === cardId);
    updatedCards.splice(updatedCards.indexOf(deletedCard), 1);
    this.updateMyCards(updatedCards);
    this.updateStorageRemainingCards(deletedCard.id);
  }

  updateMyCards = cards => {
    this.setState({myCards: cards});
    localStorage.setItem('my cards', JSON.stringify(cards))
  }

  updateStorageRemainingCards = (id, option) => {
    let remaining = JSON.parse(localStorage.getItem('remaining cards')) || [];
    if (option === 'add') {
      remaining.push(id);
    } else if (remaining.includes(id)) {
      remaining.splice(remaining.indexOf(id), 1);
    }
    localStorage.setItem('remaining cards', JSON.stringify(remaining));
  }

  markCardUsed = cardId => {
    const updatedCards = [...this.state.myCards];  
    const index = updatedCards.indexOf(updatedCards.find(card => card.id === cardId));
    updatedCards[index].new = false;
    this.updateMyCards(updatedCards);
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
                      highScore={this.state.highScore}
                />
              )}/>
              <Route path='/links' render={(props) => (<Links />)}/>
            </Switch>
        </main>
    )
  }
}

export default Main;