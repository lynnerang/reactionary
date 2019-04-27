import React from 'react';
import MyCards from './MyCards.js';
import { shallow } from 'enzyme';

const mockData = [
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
  }]

  const props = {
    saveNewCard: jest.fn(),
    deleteMyCard: jest.fn()
  }

describe('MyCards', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <MyCards data={mockData}
      myCards={mockData}
      />
      )
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has one default state property for showForm', () => {
    expect(wrapper.state()).toEqual({showForm: false});
  });

  it('can toggle the showForm state property value', () => {
    expect(wrapper.state('showForm')).toEqual(false);

    wrapper.instance().toggleForm();

    expect(wrapper.state('showForm')).toEqual(true);
  });

  it('can cancel a form in progress and turn showForm to false.', () => {
    expect(wrapper.state('showForm')).toEqual(false);

    wrapper.instance().toggleForm();

    expect(wrapper.state('showForm')).toEqual(true);

    wrapper.instance().cancelForm();

    expect(wrapper.state('showForm')).toEqual(false);
  });

});