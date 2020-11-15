import { shallow, ShallowWrapper } from 'enzyme';
import { PokemonMock } from 'mocks/pokemon';
import React from 'react';
import PokeCard, { PokeCardProps } from './PokeCard';

const defaultProps: PokeCardProps = {
  pokemon: PokemonMock
}

function setup(): ShallowWrapper {
  return shallow(
    <PokeCard {...defaultProps} />
  )
}

describe('<PokeCard />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  })

  it('matchs snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});