import { RouteProp, useNavigation } from '@react-navigation/native';
import { Card, Col, Container, Content, Row, Text, Header, Button, Left, Icon, Body, Spinner } from 'native-base';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Pokemon } from '../../types/Pokemon';
import { RootStackParamList } from '../../types/Stacks';

type PokemonDetaulsScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetailsScreen'>;

const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 140,
    flex: 1,
    alignItems: 'center',
  },
  sprite: {
    width: 200,
    height: 200
  },
  body: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export interface PokemonDetailsScreenProps {
  pokemon: Pokemon;
  route: PokemonDetaulsScreenRouteProp;
}

const PokemonDetailsScreen: React.FC<PokemonDetailsScreenProps> =
  ({ route }: PokemonDetailsScreenProps) => {
    const navigation = useNavigation();

    const { pokemon } = route.params;
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => navigation.goBack()} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{  }}>
            <Image source={require('../../assets/images/pokemon.png')} style={styles.logo} />
          </Body>
        </Header>
        <Content padder>
          <Card>
            <Body>
              <Row>
                <Col>
                  {
                    pokemon?.sprites?.front_default ?
                      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.sprite} />
                      : <Spinner />
                  }
                </Col>
                <Col style={{alignContent: 'flex-start', alignItems: 'flex-start'}}>
                  <Row>
                    <Text>
                      #
                      {pokemon.id}
                    </Text>
                  </Row>
                  <Row>
                    <Text style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                      {pokemon?.name}
                    </Text>
                  </Row>
                  <Row>
                    <Text>
                      Height:
                      {pokemon.height / 10}
                      m
                    </Text>
                  </Row>
                  <Row>
                    <Text>
                      Weight:
                      {pokemon.weight / 10}
                      kg.
                    </Text>
                  </Row>
                </Col>
              </Row>
            </Body>
          </Card>
        </Content>
      </Container>
    );
  }

export default PokemonDetailsScreen;