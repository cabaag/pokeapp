import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { Button, Container, Content, Header, Icon, Input, Item, Row, Spinner, Text } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Paginator from '../../components/Paginator/Paginator';
import PokeCard from '../../components/PokeCard/PokeCard';
import { Pokemon, PokemonListResponse } from '../../types/Pokemon';
import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignItems: 'stretch',
    width: Dimensions.get('window').width,
    paddingLeft: 8
  },
  col: {
    width: (Dimensions.get('window').width - 16) / 3,
    flex: 1,
    paddingBottom: 8,
  },
})

export default function MainScreen(): React.ReactElement {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);

  const fetchList = useCallback((page: number) => {
    console.log(limit);
    setPokemons([]);
    setLoading(true);

    Axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page * limit}`)
      .then(({ data }) => {

        setCount(data.count);
        setPokemons(data.results as Pokemon[])
        setLoading(false)

        const queries = data.results.map((p, index) => {
          return Axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
            .then(({ data: pokemonData }) => {
              pokemons[index] = pokemonData as Pokemon;
              setPokemons([...pokemons])
            })
        })
        Promise.all(queries)
          .catch(e => console.log(e))
          .finally(() => {
            setLoading(false)
          });
      })
  }, [])

  useEffect(() => {
    SecureStore.getItemAsync('pokemonsPerPage').then(ppp => setLimit(+(ppp ?? 50)))
    fetchList(0);
  }, []);


  const handleChangePage = useCallback((page) => {
    fetchList(page);
  }, [])

  const handlePressPokemon = useCallback((pokemon: Pokemon) => {
    navigation.navigate('PokemonDetailsScreen', { pokemon });
  }, [])

  const handleSearch = useCallback((newSearch: string) => {
    setSearch(newSearch)
  }, [])

  return (
    <Container>
      <Header searchBar>
        <Item>
          <Icon name="ios-search" />
          <Input
            onChangeText={handleSearch}
            placeholder={t('search')}
          />
        </Item>
        <Button transparent>
          <Text>{t('search')}</Text>
        </Button>
      </Header>
      {/* <Header>
      </Header> */}
      <Content>
        <Paginator count={count} loading={loading} onChangePage={handleChangePage} limit={limit} />
        <View style={styles.grid}>
          {
            loading && !pokemons.length ? (
              <Row style={{ justifyContent: 'center' }}>
                <Spinner size={80} />
              </Row>
            ) :
              pokemons
                .filter(p => p?.name.toLowerCase().includes(search.toLowerCase()))
                .map(pokemon =>
                  (
                    <TouchableOpacity key={pokemon?.name} onPress={() => handlePressPokemon(pokemon)} style={styles.col}>
                      <PokeCard pokemon={pokemon} />
                    </TouchableOpacity>
                  )
                )
          }
        </View>
      </Content>
    </Container>
  );
}
