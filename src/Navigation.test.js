import React from 'react';
import Navigation from './Navigation.js';
import { shallow } from 'enzyme';


describe('Navigation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <Navigation 
      />
      )
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});