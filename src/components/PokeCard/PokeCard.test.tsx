import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import PokeCard, { PokeCardProps } from './PokeCard';

const defaultProps: PokeCardProps = {
  pokemon: {
    base_experience: 0,
    height: 10,
    weight: 10,
    name: 'test',
    sprites: {
      front_default: '',
      front_shiny: '',
    },
    stats: [{
      base_stat: 10,
      effort: 0,
      stat: {
        name: 'stat test',
        url: ''
      }
    }],
    id: 0
  }
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