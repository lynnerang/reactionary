import React, { Component } from 'react';
import './MyCards.scss';
import CardForm from './CardForm.js';
import MyCardList from './MyCardList.js';

class MyCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    }
  }

  toggleForm = () => {
    const update = !this.state.showForm;
    this.setState({showForm: update})
  }

  cancelForm = () => {
    document.querySelectorAll('.new-card-input').forEach(i => i.value = '');
    this.setState({showForm: false});
  }

  render() {
    const form = this.state.showForm 
    ? <CardForm cancelForm={this.cancelForm} saveNewCard={this.props.saveNewCard} /> 
    : null;

    return (
      <>
        <h2>My Cards</h2>
        <div className='instructions'>
          <p className='top-line'>Add and delete your own custom flash cards below!</p>
          <p className='notes'>NOTE: These will be included in the 'Guess Mode' and 'Review Mode' games only.</p>
        </div>
        <div className='new-card-link'>
          <button type='button' id='new-card-btn' onClick={this.toggleForm}>+ Add New Card</button>
        </div>
        <div className='my-card-list'>
          {form}
          <MyCardList myCards={this.props.myCards} 
                      deleteMyCard={this.props.deleteMyCard} 
          />
        </div>
      </>
    )
  }
}

export default MyCards;










