import React from 'react';
import CardForm from './CardForm.js';
import { shallow } from 'enzyme';
import Button from './Button';

const mockData = {
  term: 'oh',
  desc: 'hi',
  file: ''
}

const props = {
  saveCard: jest.fn(),
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

  it('has a default state property of image url', () => {
    expect(wrapper.state()).toEqual({imageUrl: ''});
  });

  it('should save a new card when the save button is clicked', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<Button onClick={mockCallBack}>Ok!</Button>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

});