import React from 'react';
import Play from './Play.js';
import { shallow } from 'enzyme';


describe('Play', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <Play 
      />
      )
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state property of mode', () => {
    expect(wrapper.state()).toEqual({mode: 'Guess'});
  });

});