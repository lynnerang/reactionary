import React from 'react';
import CardArea from './CardArea.js';
import { shallow } from 'enzyme';

const mockData = 
  [
    {
    id: 1,
    term: "Single-page Application",
    fakeAnswers: [
    "Webpack",
    "Responsive Website"
    ],
    definition: "An application that loads a single HTML page and all the necessary assets (such as JavaScript and CSS) required for the app to run. Any interactions don't require a trip to server/page reload.",
    example: "./images/example{exampleId}.png"
    },
    {
    id: 2,
    term: "Compilers",
    fakeAnswers: [
    "Bundlers",
    "Package Managers"
    ],
    definition: "These things take JavaScript code, transform it, and return it as JavaScript code in a different format.",
    example: "Babel is a popular example, and is most commonly used for React and transforms ES6 syntax into syntax that older browsers can interpret."
    }
  ];


describe('CardArea', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <CardArea mode='Guess' 
      data={mockData}
      myCards={mockData}/>
      )
  });

  afterEach(() => {
    wrapper = null;
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has four default state properties', () => {
    expect(wrapper.state()).toEqual({
      cards: [],
      remainingCardIds: [],
      randomCard: {},
      hasTerm: false,
      showDialog: false
    });
  });
});