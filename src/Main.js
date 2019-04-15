import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './Main.scss';
import Home from './Home.js';
import Play from './Play.js';
import MyCards from './MyCards.js';

const myCards = JSON.parse(localStorage.getItem('my cards')) || [];

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myCards: myCards
    }
  }

  saveNewCard = (term, desc, file) => {
    const newCard = {id: Date.now(), term: term, definition: desc, example: file, myCard: true};
    const updatedCards = this.state.myCards;
    updatedCards.push(newCard);
    this.updateMyCards(updatedCards);
  }

  deleteMyCard = (e) => {
    const updatedCards = this.state.myCards;
    const match = updatedCards.find(card => card.id === e.target.closest('.card').id);
    updatedCards.splice(updatedCards.indexOf(match), 1);
    this.updateMyCards(updatedCards);
  }

  updateMyCards = (cards) => {
    this.setState({myCards: cards});
    localStorage.setItem('my cards', JSON.stringify(cards))
  }

  render() {
    return (
        <main>
          <Switch>
            <Route path='/' exact render={(props) => (<Home />)}/>
            <Route path='/play' render={(props) => (
              <Play data={this.props.data} myCards={this.state.myCards}/>
            )}/>
            <Route path='/mycards' render={(props) => (
              <MyCards data={this.props.data}
                       myCards={this.state.myCards}
                       saveNewCard={this.saveNewCard} 
                       deleteMyCard={this.deleteMyCard}
              />
            )}/>

          </Switch>
        </main>
    )
  }
}

export default Main;