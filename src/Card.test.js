import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card.js';
import { shallow } from 'enzyme';

const mockData = {
  id: 2,
  term: "Compilers",
  fakeAnswers: ["Bundlers", "Package Managers"],
  definition: "These things take JavaScript code, transform it, and return it as JavaScript code in a different format.",
  example: "Babel is a popular example, and is most commonly used for React and transforms ES6 syntax into syntax that older browsers can interpret."
}

const props = {
  deleteMyCard: jest.fn(),
};

describe('Card', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <Card {...props}
      hasTerm={false} 
      canDelete={true} 
      cardData={mockData}
      />
      )
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Card 
      hasTerm={false} 
      canDelete={true} 
      cardData={mockData}
      />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has one default state properties', () => {
    expect(wrapper.state()).toEqual({showExample: false});
  });

  it('should toggle the showExample state', () => {
    expect(wrapper.state('showExample')).toEqual(false);

    wrapper.instance().toggleExample();

    expect(wrapper.state('showExample')).toEqual(true);
  });

  it('can run a method to tell a parent component to delete it', () => {
    wrapper.instance().deleteCard();

    expect(props.deleteMyCard).toHaveBeenCalledTimes(1);

    expect(props.deleteMyCard).toHaveBeenCalledWith(mockData.id);
  });

});