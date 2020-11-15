import { shallow, ShallowWrapper } from 'enzyme';
import { Input } from 'native-base';
import React from 'react';
import LangPicker from '../../components/LangPicker/LangPicker';
import Paginator from '../../components/Paginator/Paginator';
import MainScreen from './MainScreen';


jest.mock('@react-navigation/native');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

function setup(): ShallowWrapper {
  return shallow(<MainScreen />)
}

describe.only('<MainScreen />', () => {
  let wrapper: ShallowWrapper;


  beforeEach(() => {
    wrapper = setup();
  })

  it('matchs snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handle search', () => {
    const input = wrapper.find(Input);
    input.simulate('changeText', 'test');
  })

  it('contains LangPicker', () => {
    expect(wrapper.find(LangPicker)).toHaveLength(1);
  })

  it('contains Paginator', () => {
    expect(wrapper.find(Paginator)).toHaveLength(1);
  })

});