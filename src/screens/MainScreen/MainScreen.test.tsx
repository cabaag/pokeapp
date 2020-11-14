import { NavigationContainer } from '@react-navigation/native';
import { shallow, ShallowWrapper } from 'enzyme';
import { Header } from 'native-base';
import React from 'react';
import MainScreen from './MainScreen';

function setup(): ShallowWrapper {
  return shallow(
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>);
}

describe('<MainScreen />', () => {
  let wrapper: ShallowWrapper;


  beforeEach(() => {
    wrapper = setup();
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

});