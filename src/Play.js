import React, { Component } from 'react';
import './Play.scss';
import CardArea from './CardArea.js';


class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'Guess'
    }
  }

  render() {
    return (
      <>
        <h2>Play</h2>
        <h3>{this.state.mode} Mode</h3>
        <div className='instructions'>
          <p>Read the description below, and enter the term you think this describes. View the example if you'd like some extra help!</p>
        </div>
        <CardArea mode={this.state.mode} 
                  data={this.props.data}
                  myCards={this.props.myCards}
        />
      </>
    )
  }
}

export default Play;










