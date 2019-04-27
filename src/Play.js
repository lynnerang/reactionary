import React, { Component } from 'react';
import './Play.scss';
import { Route, Switch, NavLink } from 'react-router-dom';
import GuessMode from './GuessMode.js';
import ReviewMode from './ReviewMode.js';
import ChoiceMode from './ChoiceMode.js';

class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <>
        <h2>Play</h2>
        <Switch>
          <Route path='/play' exact render={(props) => (
            <>
              <p className='instructions'>Choose from multiple game styles, like entering a guess or choosing a guess from multiple choices.</p>
              <div className='mode-option'>
                <i className="fas fa-feather"></i>
                <div>
                  <NavLink className='home-link' to='/play/guess'>
                    <h3 className='home-option-heading'>Guess Mode</h3>
                    <p>In this mode, you are shown definitions of React terms with an optional example for extra help, and you type what you think the term is.</p>
                  </NavLink>
                </div>
              </div>
              <div className='mode-option'>
                <i className="far fa-hand-point-up"></i>
                <div>
                  <NavLink className='home-link' to='/play/choice'>
                    <h3 className='home-option-heading'>Choice Mode</h3>
                    <p>In this mode, you are shown definitions of React terms with an optional example for extra help, and you click one of three multiple choices that you think it describes.</p>
                  </NavLink>
                </div>
              </div>
              <div className='mode-option'>
                <i className="far fa-eye"></i>
                <div>
                  <NavLink className='home-link' to='/play/review'>
                    <h3 className='home-option-heading'>Review Mode</h3>
                    <p>In this mode, you can go through all available cards in the app to brush up on your skills in preparation for the Choice and Guess mode games!</p>
                  </NavLink>
                </div>
              </div>
            </>
           )} />
            <Route path='/play/guess' exact render={(props) => (<GuessMode
                    data={this.props.data} 
                    myCards={this.props.myCards}
                    updateGameCount={this.props.updateGameCount}
                    markCardUsed={this.props.markCardUsed}
                    checkHighScore={this.props.checkHighScore}
                    updateGuessCount={this.props.updateGuessCount}
            />)}
            />
            <Route path='/play/choice' exact render={(props) => (<ChoiceMode
                    data={this.props.data} 
                    myCards={this.props.myCards}
                    updateGameCount={this.props.updateGameCount}
                    markCardUsed={this.props.markCardUsed}
                    checkHighScore={this.props.checkHighScore}
                    updateGuessCount={this.props.updateGuessCount}
            />)}
            />
            <Route path='/play/review' render={(props) => (
            <ReviewMode data={this.props.data} 
                        myCards={this.props.myCards}
            />
          )}/>
        </Switch>
      </>
    )
  }
}

export default Play;










