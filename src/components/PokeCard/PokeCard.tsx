import { Body, Card, CardItem, Col, Row, Spinner, Text } from 'native-base';
import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import typesMapper from 'utils/typesMapper';
import { Pokemon } from '../../types/Pokemon';

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
  },
  badge: {
    borderRadius: 50,
    width: 10,
    height: 10,
    margin: 10,
  }
})

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }: PokeCardProps) => {
  return (
    <Card style={{ height: '100%', margin: 8 }}>
      <CardItem>
        <Body style={styles.body}>
          <Row>
            {pokemon?.types?.map(type => (
              <View
                key={type.slot}
                style={{
                  ...styles.badge,
                  backgroundColor: typesMapper(type.type.name) as string
                }}
              />
            ))}
          </Row>
          {
            pokemon?.sprites?.front_default ?
              <Image source={{ uri: pokemon.sprites.front_default }} style={styles.sprite} />
              : <Spinner />
          }
          <Text style={{ fontWeight: 'bold' }}>
            # 
            {' '}
            {pokemon?.id}
          </Text>
          <Text style={{ textTransform: 'capitalize' }}>
            {pokemon.name}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
}

export default memo(PokeCard);