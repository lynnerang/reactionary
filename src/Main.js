import React, { Component } from 'react';
import './Main.scss';
import CardArea from './CardArea.js';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: 'Play',
      mode: 'guess'
    }
  }

  render() {
    return (
      <main>
        <h2>{this.state.heading}</h2>
        <h3>Guess Mode</h3>
        <div className='instructions'>
          <p>Read the description below, and enter the term you think this describes. View the example if you'd like some extra help!</p>
        </div>
        <CardArea mode={this.state.mode} 
                  data={this.props.data}
        />
      </main>
    )
  }
}

export default Main;