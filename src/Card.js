import React, { Component } from 'react';
import './Card.scss';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showExample: false
    }
  }

  showExample = () => {
    this.setState({showExample: true});
  }

  closeExample = () => {
    this.setState({showExample: false});
  }

  deleteCard = () => {
    const id = this.props.cardData.id;
    this.props.deleteMyCard(id);
  }

  render() {
    const substring = this.props.cardData.example ? this.props.cardData.example.substring(0,3) : null;
    let example;

    if (!this.props.cardData.example) {
      example = <div><p>No example for this card</p></div>
    } else if (substring === './i' ) {
      const url = require(`./images/example${this.props.cardData.id}.png`);
      example = <img className='example-img' src={url} alt='visual example' />
    } else if (substring === 'dat') {
      example = <img className='example-img' src={this.props.cardData.example} alt='visual example' />
    } else {
      example = <div><p>{this.props.cardData.example}</p></div>;
    } 

    let popup = this.state.showExample && <div className='popup'>
        {example}
        <i className='fas fa-times popup-close-btn' onClick={this.closeExample}> close</i>
      </div>;
 
    let term = this.props.hasTerm ? this.props.cardData.term : 'What am I?';
    
    const deleteBtn = this.props.canDelete && <i className='fa fa-trash' onClick={this.deleteCard}></i>

    return (
      <>
      {popup}
        <article className='card'>
          {deleteBtn}        
          <div className='card-top'>
            <h4 className='term-header'>{term}</h4>
          </div>
          <div className='card-bottom'>
            <h4 className='description-header'>Description: </h4>
            <p className='description'>{this.props.cardData.definition}</p>
            <p className='example-link' onClick={this.showExample}>(View Example)</p>
          </div>
          </article>
        </>
    )
  }
}

export default Card;