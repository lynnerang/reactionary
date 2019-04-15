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

  render() {
    // const exampleId = this.props.cardData.id;
    const url = require(`./images/example28.png`);

    let popup = this.state.showExample && <div className='popup'>
        <img className='example-img' src={url} alt='visual example' onBlur={this.closeExample}/>
        <i className='fas fa-times popup-close-btn' onClick={this.closeExample}> close</i>
      </div>;
 
    let term = this.props.hasTerm ? this.props.cardData.term
    : 'What am I?';
    
    const deleteBtn = this.props.canDelete && <i className='fa fa-trash' onClick={this.props.deleteMyCard}></i>

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