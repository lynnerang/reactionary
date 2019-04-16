import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import { shallow } from 'enzyme';

const mockData = {
  id: 2,
  term: "Compilers",
  fakeAnswers: ["Bundlers", "Package Managers"],
  definition: "These things take JavaScript code, transform it, and return it as JavaScript code in a different format.",
  example: "Babel is a popular example, and is most commonly used for React and transforms ES6 syntax into syntax that older browsers can interpret."
}


describe('Main', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow (
      <Main 
        data={mockData}
      />
      )
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has four default state properties', () => {
    expect(wrapper.state()).toEqual({
      myCards: [],
      gameCount: 0,
      totalGuesses: 0,
      highScore: {totalCards: 0, guesses: 0}
    });
  });

  it('can update the total game count', () => {
    expect(wrapper.state('gameCount')).toEqual(0);

    wrapper.instance().updateGameCount();

    expect(wrapper.state('gameCount')).toEqual(1);
  });

  it('can update a total guess count.', () => {
    expect(wrapper.state('totalGuesses')).toEqual(0);

    wrapper.instance().updateGuessCount('add');

    expect(wrapper.state('totalGuesses')).toEqual(1)
  });

  it('can check the current high score and update if it the arg is a higher score', () => {
    expect(wrapper.state('highScore')).toEqual({totalCards: 0, guesses: 0});

    wrapper.instance().updateGuessCount('add');

    wrapper.instance().checkHighScore(1);

    expect(wrapper.state('highScore')).toEqual({totalCards: 1, guesses: 2});
  });

  it('can save a new custom card to its myCards state.', () => {
    expect(wrapper.state('myCards').length).toEqual(0);

    wrapper.instance().saveNewCard('term1', 'def1', '');

    expect(wrapper.state('myCards').length).toEqual(1);
  });

  it('can delete a card from its myCards state.', () => {
    expect(wrapper.state('myCards').length).toEqual(1);

    wrapper.instance().saveNewCard('term2', 'def2', '');
    wrapper.instance().saveNewCard('term3', 'def3', '');

    expect(wrapper.state('myCards').length).toEqual(3);

    wrapper.instance().deleteMyCard(wrapper.state('myCards')[0].id);

    expect(wrapper.state('myCards').length).toEqual(2);
  });

  it('can update the myCards state to any array.', () => {
    expect(wrapper.state('myCards').length).toEqual(2);

    wrapper.instance().updateMyCards(['oh', 'hi', 'mark']);

    expect(wrapper.state('myCards')).toEqual(['oh', 'hi', 'mark']);
  });

  it('can set a custom card property of new to false.', () => {
    expect(wrapper.state('myCards')[0].new).toEqual(true);

    wrapper.instance().markCardUsed(wrapper.state('myCards')[0].id);

    expect(wrapper.state('myCards')[0].new).toEqual(false);
  });

  afterEach(() => {
    wrapper = null;
  });

});