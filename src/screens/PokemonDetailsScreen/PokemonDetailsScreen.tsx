import { RouteProp, useNavigation } from '@react-navigation/native';
import { Body, Card, Col, Container, Content, Row, Spinner, Text } from 'native-base';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';
import typesMapper from '../../utils/typesMapper';
import { RootStackParamList } from '../../types/Stacks';
import { retrievePokemon } from '../../services/Pokemon';
import { Pokemon } from '../../types/Pokemon';

type PokemonDetaulsScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetailsScreen'>;

const styles = StyleSheet.create({
  sprite: {
    width: 150,
    height: 150
  },
  line: {
    backgroundColor: '#ddd',
    height: 1,
    flex: 1,
    borderRadius: 10,

  },
  badge: {
    borderRadius: 50,
    width: 10,
    height: 10,
    margin: 10,
  }

})

export interface PokemonDetailsScreenProps {
  route: PokemonDetaulsScreenRouteProp;
}

const PokemonDetailsScreen: React.FC<PokemonDetailsScreenProps> =
  ({ route }: PokemonDetailsScreenProps) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { pokemonName } = route.params;
    const [loading, setLoading] = useState(true)
    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(() => {
      retrievePokemon(pokemonName).then(setPokemon).finally(() => {
        setLoading(false)
      })
    }, [])

    useLayoutEffect(() => {
      navigation.setOptions({
        title: pokemon?.name
      })
    }, [navigation, pokemon]);


    return (
      <Container>
        <Content padder>
          <Card>
            <Body style={{ alignItems: 'flex-start', paddingRight: 20, paddingLeft: 20 }}>
              <Row>
                <Col>
                  {loading && <Spinner />}
                  {
                    !loading && pokemon?.sprites?.front_default ?
                      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.sprite} />
                      : null
                  }
                </Col>
                <Col style={{ alignContent: 'flex-start', alignItems: 'flex-start', paddingTop: 20 }}>
                  <Text>
                    #
                    {pokemon?.id}
                  </Text>
                  <Text style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {pokemon?.name}
                  </Text>
                  <Text>
                    {t('height')}
                    :
                    {' '}
                    {(pokemon?.height ?? 1) / 10}
                    m
                  </Text>
                  <Text>
                    {t('weight')}
                    :
                    {' '}
                    {(pokemon?.weight ?? 1) / 10}
                    kg
                  </Text>
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
                </Col>
              </Row>
              <Row>
                <Row style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                  <Col style={styles.line} />
                  <Text style={{ fontSize: 20 }}>
                    {t('stadistics')}
                  </Text>
                  <Col style={styles.line} />
                </Row>
              </Row>
              <Col style={{ paddingTop: 10, paddingBottom: 10 }}>
                {
                  pokemon?.stats.map(stat => (
                    <Col key={stat.stat.name}>
                      <Row style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', width: 130 }}>
                          {t(stat.stat.name)}
                          {' '}
                          :
                          {stat?.base_stat}
                        </Text>
                        <Slider
                          maximumTrackTintColor="#3F51B5"
                          maximumValue={140}
                          minimumTrackTintColor="#3F51B5"
                          minimumValue={0}
                          style={{ width: 230, height: 40 }}
                          thumbTintColor='#3F51B5'
                          value={stat?.base_stat}

                        />
                      </Row>
                    </Col>
                  ))
                }
              </Col>
            </Body>
          </Card>
        </Content>
      </Container>
    );
  }

export default React.memo(PokemonDetailsScreen);