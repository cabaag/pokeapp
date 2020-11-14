import { Body, Card, CardItem, Text, Spinner, Row } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { Pokemon } from '../types/Pokemon';

export interface PokeCardProps {
  pokemon: Pokemon
}

const styles = StyleSheet.create({
  sprite: {
    width: 100,
    height: 100
  },
  body: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }: PokeCardProps) => {
  return (
    <Card style={{ height: '100%', margin: 8 }}>
      <CardItem>
        <Body style={styles.body}>
          {
            pokemon?.sprites?.front_default ?
              <Image source={{ uri: pokemon.sprites.front_default }} style={styles.sprite} />
              : <Spinner />
          }
          <Text style={{ textTransform: 'capitalize' }}>
            {pokemon.name}
          </Text>

          <Row />

        </Body>
      </CardItem>
    </Card>
  );
}

export default memo(PokeCard);