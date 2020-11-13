import { shallow, ShallowWrapper } from 'enzyme';
import { Header } from 'native-base';
import React from 'react';
import MainScreen from './MainScreen';

/* @jest-environment jsdom */

function setup(): ShallowWrapper {
  return shallow(<MainScreen />);
}

describe('<MainScreen />', () => {
  let wrapper: ShallowWrapper;


  beforeEach(() => {
    wrapper = setup();
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('displays loader', () => {

    expect(wrapper.find(Header)).toHaveLength(1);

  })
});