import { shallow, ShallowWrapper } from 'enzyme';
import { PokemonMock } from 'mocks/pokemon';
import { Spinner } from 'native-base';
import React from 'react';
import PokemonDetailsScreen, { PokemonDetailsScreenProps } from './PokemonDetailsScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    setOptions: jest.fn()
  })
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