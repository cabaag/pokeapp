import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import LangPicker from '../../components/LangPicker/LangPicker';
import SettingsScreen from './SettingsScreen';


function setup(): ShallowWrapper {
  return shallow(<SettingsScreen />)
}

describe.only('<SettingsScreen />', () => {
  let wrapper: ShallowWrapper;


  beforeEach(() => {
    wrapper = setup();
  })

  it('matchs snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains LangPicker', () => {
    expect(wrapper.find(LangPicker)).toHaveLength(1);
  })


});