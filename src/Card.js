import React, { Component } from 'react';
import './Card.scss';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  showExample = () => {
    document.querySelector('.popup').classList.remove('hidden');
  }

  closeExample = () => {
    document.querySelector('.popup').classList.add('hidden');
  }

  render() {
    let term = this.props.hasTerm ? this.props.cardData.term
    : 'What am I?';
 
    const exampleId = this.props.cardData.id;
    const url = require(`./images/example28.png`);

    return (
      <article className='card'>

        <div className='popup hidden'>
          <img className='example-img' src={url} alt='visual example' onBlur={this.closeExample}/>
          <i className='fas fa-times popup-close-btn' onClick={this.closeExample}> close</i>
        </div>
        
        <div className='card-top'>
          <h4 className='term-header'>{term}</h4>
        </div>
        <div className='card-bottom'>
          <h4 className='description-header'>Description: </h4>
          <p className='description'>{this.props.cardData.definition}</p>
          <a className='example-link' onClick={this.showExample}>View Example </a>
        </div>
        </article>
    )
  }
}

export default Card;