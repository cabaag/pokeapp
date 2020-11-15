import { shallow, ShallowWrapper } from 'enzyme';
import { PokemonMock } from 'mocks/pokemon';
import { Spinner } from 'native-base';
import React from 'react';
import PokemonDetailsScreen, { PokemonDetailsScreenProps } from './PokemonDetailsScreen';

const goBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack
  })
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const defaultProps: PokemonDetailsScreenProps = {
  route: {
    key: '',
    name: 'PokemonDetailsScreen',
    params: {
      pokemon: PokemonMock
    }
  },
}

function setup(customProps?: any): ShallowWrapper {
  return shallow(
    <PokemonDetailsScreen {...defaultProps} {...customProps} />
  )
}

describe('<PokemonDetailsScreen />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  })

  it('matchs snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should go back', () => {
    const backButton = wrapper.find("[data-test='goBack']")
    backButton.simulate('press');
    expect(goBack).toHaveBeenCalled();
  })

  it('should render spinner', () => {
    wrapper = setup({
      route: {
        key: '',
        name: 'PokemonDetailsScreen',
        params: {
          pokemon: null
        }
      }
    })
    expect(wrapper.find(Spinner)).toHaveLength(1);
  })

});