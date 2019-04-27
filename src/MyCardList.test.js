import React from 'react';
import MyCardList from './MyCardList.js';
import { shallow } from 'enzyme';


describe('MyCardList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
      <MyCardList 
      />
      )
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});