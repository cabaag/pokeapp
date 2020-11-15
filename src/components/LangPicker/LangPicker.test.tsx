import { shallow, ShallowWrapper } from 'enzyme';
import { Picker } from 'native-base';
import React from 'react';
import LangPicker from './LangPicker';

const changeLanguage = jest.fn()
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage,
    }
  }),
}));

function setup(): ShallowWrapper {
  return shallow(
    <LangPicker />
  )
}

describe('<LangPicker />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  })

  it('matchs snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should fire change language', () => {
    const picker = wrapper.find(Picker);
    picker.simulate('valueChange');
    expect(changeLanguage).toHaveBeenCalled();
  })

});