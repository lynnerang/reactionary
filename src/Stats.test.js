import React from 'react';
import Stats from './Stats.js';
import { shallow } from 'enzyme';

const props = {
  highScore: {guesses: 6, totalCards: 4},
  gameCount: 2
}


describe('Stats', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <Stats {...props}
      />
      )
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});