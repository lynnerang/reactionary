import React from 'react';
import CardForm from './CardForm.js';
import { shallow } from 'enzyme';

const mockData = {
  term: 'oh',
  desc: 'hi',
  file: ''
}

const props = {
  saveNewCard: jest.fn(),
}


describe('CardForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <CardForm 
      />
      )
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has no default state properties', () => {
    expect(wrapper.state()).toEqual({});
  });

  it('can get input details and call saveNewCard with them.', () => {
    wrapper.instance().saveCard();

    expect(props.saveNewCard).toHaveBeenCalledTimes(1);

    expect(props.saveNewCard).toHaveBeenCalledWith(mockData.term, mockData.desc, mockData.file);
  });

});