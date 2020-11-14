import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { Body, Button, Container, Content, Header, Icon, Input, Item, Spinner, Text } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LangPicker from '../../components/LangPicker';
import Paginator from '../../components/Paginator/Paginator';
import PokeCard from '../../components/PokeCard';
import { Pokemon, PokemonListResponse } from '../../types/Pokemon';


const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 140,
    flex: 1,
    alignItems: 'center',
  },
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
    flex: 1
  },
})

export default function MainScreen(): React.ReactElement {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const limit = 50;
  const [count, setCount] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchList = useCallback((page: number) => {
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
        Promise.all(queries).finally(() => {
          setLoading(false)
        });
      })
  }, [])

  useEffect(() => {
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
      <Header>
        <Body style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../assets/images/pokemon.png')} style={styles.logo} />
        </Body>
      </Header>
      <Header rounded searchBar>
        <Item>
          <Icon name="ios-search" />
          <Input
            onChangeText={handleSearch}
            placeholder={t('search')}
          />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <Content>
        <LangPicker />

        <View style={styles.grid}>
          {
            loading && pokemons.length ?
              <Spinner /> :
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
        <Paginator count={count} loading={loading} onChangePage={handleChangePage} />
      </Content>
    </Container>
  );
}
