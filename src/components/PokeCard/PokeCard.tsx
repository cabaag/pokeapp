import { Body, Card, Col, Row, Spinner, Text } from 'native-base';
import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import typesMapper from 'utils/typesMapper';
import { Pokemon } from '../../types/Pokemon';

export interface PokeCardProps {
  pokemon: Pokemon;
  direction: 'column' | 'row';
}

const styles = StyleSheet.create({
  sprite: {
    width: 80,
    height: 80
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

const PokeCard: React.FC<PokeCardProps> = ({ pokemon, direction }: PokeCardProps) => {
  const renderTypes = () => {
    return pokemon?.types?.map(type => (
      <View
        key={type.slot}
        style={{
          ...styles.badge,
          backgroundColor: typesMapper(type.type.name) as string
        }}
      />
    ))
  }
  return (
    <Card style={{ padding: 8 }}>
      <Body style={{ ...styles.body, flexDirection: direction }}>
        <Col>
          {direction === 'column' && (
            <Row style={{ justifyContent: 'center' }}>
              {renderTypes()}
            </Row>
          )}
          <Row style={{ justifyContent: 'center' }}>
            {
              pokemon?.sprites?.front_default ?
                <Image source={{ uri: pokemon.sprites.front_default }} style={styles.sprite} />
                : <Spinner />
            }
          </Row>
        </Col>
        <Col>
          {direction === 'row' && (
            <Row style={{ justifyContent: 'center' }}>
              {renderTypes()}
            </Row>
          )}
          <Row style={{ justifyContent: direction === 'row' ? 'flex-start' : 'center'}}>
            <Text style={{ fontWeight: 'bold' }}>
              #
              {' '}
              {pokemon?.id}
            </Text>
          </Row>
          <Row style={{ justifyContent: direction === 'row' ? 'flex-start' : 'center'}}>
            <Text style={{ textTransform: 'capitalize' }}>
              {pokemon.name}
            </Text>
          </Row>

        </Col>
      </Body>
    </Card>
  );
}

export default memo(PokeCard);