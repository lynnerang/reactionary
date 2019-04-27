import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { shallow } from 'enzyme';


describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <App />
      )
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has two default state properties for loading status and data', () => {
    expect(wrapper.state()).toEqual({data: [], loading: true});
  });

});