import React, { Component } from 'react';
import './CardForm.scss';

const validType = file => (/\.(jpe?g|png|gif)$/i.test(file.name));

class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  saveCard = (e) => {
    const term = document.querySelector('#my-term-input').value;
    const desc = document.querySelector('#my-desc-input').value;
    const file = document.querySelector('#my-example-input').value;

    this.props.saveNewCard(term, desc, file);
    document.querySelectorAll('.new-card-input').forEach(i => i.value = '');
  }

  getImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0] && validType(e.target.files[0])) {
      reader.readAsDataURL(e.target.files[0]); 
      // reader.onload = function() {document.querySelector('#my-example-input').value = e.target.result};
    } 
  }

  render() {
    return (
      <form className='new-card-form'>
        <label htmlFor='my-term-input'>Term<span>*</span>:</label>
        <input type='text' className='new-card-input' id='my-term-input' maxLength='30'></input>
        <label htmlFor='my-desc-input'>Description<span>*</span>:</label>
        <textarea className='new-card-input' id='my-desc-input' maxLength='80'></textarea>
        <label htmlFor='my-desc-input'>Example:</label>
        <input type='file' className='new-card-input' id='my-example-input' onChange={this.getImage}></input>
        <div className='new-card-form-btns'>
          <button type='button' className='cancel-card-btn' onClick={this.props.cancelForm}>Cancel</button>
          <button type='button' className='save-card-btn' onClick={this.saveCard}>Save</button>       
        </div>
      </form>
    )
  }
}

export default CardForm;