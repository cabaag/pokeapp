import { RouteProp, useNavigation } from '@react-navigation/native';
import { Body, Card, Col, Container, Content, Row, Spinner, Text } from 'native-base';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';
import typesMapper from '../../utils/typesMapper';
import { RootStackParamList } from '../../types/Stacks';

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
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { pokemon } = route.params;
    
    navigation.setOptions({
      title: pokemon?.name
    })
    
    return (
      <Container>
        <Content padder>
          <Card>
            <Body style={{ alignItems: 'flex-start', paddingRight: 20, paddingLeft: 20 }}>
              <Row>
                <Col>

                  {
                    pokemon?.sprites?.front_default ?
                      <Image source={{ uri: pokemon?.sprites.front_default }} style={styles.sprite} />
                      : <Spinner />
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
                    {pokemon?.height / 10}
                    m
                  </Text>
                  <Text>
                    {t('weight')}
                    :
                    {' '}
                    {pokemon?.weight / 10}
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
                      <Row>
                        <Text style={{ fontWeight: 'bold' }}>
                          {t(stat.stat.name)}
                        </Text>
                        <Text>
                          :
                          {' '}
                          {stat.base_stat}
                        </Text>
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