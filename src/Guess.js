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
    var stringSimilarity = require('string-similarity');
    var similarity = stringSimilarity.compareTwoStrings(input.value, this.props.answer);

    if (similarity >= .72) {
      this.props.removeCard();
      this.showResponse('That is correct, nice job!', 'fa-check') ;
    } else {
      this.showResponse('Not quite!  We\'ll try this one again later.', 'fa-times');
    }
    input.value = '';
    setTimeout(() => { this.props.getRandomCard() }, 2000);
  }

  showResponse = (text, icon) => {
    const response = document.querySelector('.guess-response');
    this.setState({errorTxt: text,errorIconClass: icon}, () => {
      response.classList.remove('invisible');
      setTimeout(() => response.classList.add('invisible'), 2000)
    })

  }

  render() {
    console.log(this.props.answer)
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