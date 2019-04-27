import React from 'react';
import Home from './Home.js';
import { shallow } from 'enzyme';


describe('Home', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <Home 
      />
      )
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});