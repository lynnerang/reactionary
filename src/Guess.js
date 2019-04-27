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
    let value = e.target.type === 'button' ? e.target.id
    : e.target.closest('.guess-entry').querySelector('input').value;

    let correct = e.target.type === 'button' ? value === this.props.answer 
    : this.isSimilarEnough(value);

    if (correct) {
      this.showResponse('That is correct, nice job!', 'fa-check');
      this.props.removeCard();
    } else {
      this.showResponse('Not quite!  We\'ll try this one again later.', 'fa-times');
    }
    this.getNextTurn(e.target);
  }

  getNextTurn = () => {
    setTimeout(() => { 
      this.props.getRandomCard();
      const textInput = document.querySelector('#term-input');
      if (textInput) textInput.value = '';
      this.props.updateGuessCount(this.props.mode, 'add');
    }, 2000);
  }

  isSimilarEnough = (value) => {
    const check = require('string-similarity');
    const similarity = check.compareTwoStrings(value.toLowerCase(), this.props.answer.toLowerCase());
    return similarity >= .72;
  }

  showResponse = (text, icon) => {
    const response = document.querySelector('.guess-response');
    this.setState({errorTxt: text, errorIconClass: icon}, () => {
      response.classList.remove('invisible');
      setTimeout(() => response.classList.add('invisible'), 2000)
    })
  }

  onGuessKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.checkAnswer(e);
    }
  }

  render() {
    let iconClass = `fas ${this.state.errorIconClass}`;
    let guessLayout;

    this.props.mode === 'guess' ? guessLayout =  (
      <><label htmlFor='term-input'>Enter your guess:</label>
        <div className='guess-entry'>
          <input id='term-input' className='single-guess-input' autoComplete='off' onKeyPress={this.onGuessKeyPress}></input>
          <button type='button' className='single-guess-btn' onClick={this.checkAnswer}><i className='fas fa-arrow-right'></i></button>
        </div>
        <div className='guess-response correct-guess-response'>
          <i className={iconClass}></i><p>{this.state.errorTxt}</p>
        </div>
      </> )
    : guessLayout = (
      <><label>Choose a term:</label>
        <div className='guess-choices'>
          <button type='button' className='choice' id={this.props.choices[0]} onClick={this.checkAnswer}>{this.props.choices[0]}</button>
          <button type='button' className='choice' id={this.props.choices[1]} onClick={this.checkAnswer}>{this.props.choices[1]}</button>
          <button type='button' className='choice' id={this.props.choices[2]} onClick={this.checkAnswer}>{this.props.choices[2]}</button>
        </div>
        <div className='guess-response correct-guess-response'>
          <i className={iconClass}></i><p>{this.state.errorTxt}</p>
        </div>
      </> )

    return (
      <article className='guess-area'>
        {guessLayout}
      </article>
    )
  }
}

export default Guess;