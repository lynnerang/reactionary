import React from 'react';
import Guess from './Guess.js';
import { shallow } from 'enzyme';

const props = {
  showResponse: jest.fn(),
  updateGuessCount: jest.fn(),
  getRandomCard: jest.fn()
}

describe('Guess', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <Guess {...props}
      />
      )
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has two default state properties', () => {
    expect(wrapper.state()).toEqual({
      errorTxt: '',
      errorIconClass: ''
    });
  });

  it('can check a guess against an answer', () => {
    wrapper.instance().checkAnswer();
    expect(wrapper.checkAnswer).toHaveBeenCalledTimes(1);
  });

  it('can go to the next turn by updating the guess count and getting a new random card.', () => {
    wrapper.instance().getNextTurn('poop');

    expect(wrapper.getNextTurn).toHaveBeenCalledTimes(1);
    expect(props.updateGuessCount).toHaveBeenCalledTimes(1);
    expect(props.getRandomCard).toHaveBeenCalledTimes(1);
  });

  it('can calculate the level of similarity between the guess and answer.', () => {
    wrapper.instance().isSimilarEnough('poop');

    expect(wrapper.calcSimilarity).toHaveBeenCalledTimes(1);
  });

  it('can show a response in the dom depending on whether the guess was right.', () => {
    wrapper.instance().showResponse();

    expect(wrapper.showResponse).toHaveBeenCalledTimes(1);
  });

});