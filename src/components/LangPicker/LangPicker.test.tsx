import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import LangPicker from './LangPicker';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  language: 'en',
  languages: ['en'],
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

});