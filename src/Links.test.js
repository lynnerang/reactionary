import React from 'react';
import ReactDOM from 'react-dom';
import Links from './Links.js';
import { shallow } from 'enzyme';


describe('Links', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <Links 
      />
      )
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Links 
    />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});