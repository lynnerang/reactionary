import React, { Component } from 'react';
import './Guess.scss';

class Guess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorTxt: '',
      errorIconClass: ''
    }
  }

  checkAnswer = (e) => {
    const input = e.target.closest('.guess-entry').querySelector('input');
    if (this.calcSimilarity(input) >= .72) {
      this.showResponse('That is correct, nice job!', 'fa-check');
      this.props.removeCard();
    } else {
      this.showResponse('Not quite!  We\'ll try this one again later.', 'fa-times');
    }
    this.getNextTurn(input);
  }

  getNextTurn = (input) => {
    this.props.updateGuessCount('add');
    setTimeout(() => { 
      this.props.getRandomCard();
      input.value = '';
    }, 2000);
  }

  calcSimilarity = (input) => {
    const check = require('string-similarity');
    const similarity = check.compareTwoStrings(input.value.toLowerCase(), this.props.answer.toLowerCase());
    return similarity;
  }

  showResponse = (text, icon) => {
    const response = document.querySelector('.guess-response');
    this.setState({errorTxt: text, errorIconClass: icon}, () => {
      response.classList.remove('invisible');
      setTimeout(() => response.classList.add('invisible'), 2000)
    })
  }

  render() {
    let iconClass = `fas ${this.state.errorIconClass}`;

    return (
      <article className='guess-area'>
        <label htmlFor='term-input'>Enter your guess:</label>
        <div className='guess-entry'>
          <input id='term-input' className='single-guess-input' autoComplete='off'></input>
          <button type='button' className='single-guess-btn' onClick={this.checkAnswer}><i className="fas fa-arrow-right"></i></button>
        </div>
        <div className='guess-response correct-guess-response'>
          <i className={iconClass}></i><p>{this.state.errorTxt}</p>
        </div>
      </article>
    )
  }
}

export default Guess;