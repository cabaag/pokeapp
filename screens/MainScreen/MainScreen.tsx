import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { Body, Button, Container, Content, Header, Icon, Input, Item, Left, Right, Spinner, Text, Switch, Picker } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PokeCard from '../../components/PokeCard';
import { Pokemon, PokemonListResponse } from '../../types/Pokemon';
import I18n from '../../utils/i18n';


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
    justifyContent: 'center',
    width: Dimensions.get('window').width
  },
  col: {
    width: (Dimensions.get('window').width - 16) / 3,
    flex: 1
  },
  paginator: {
    flexDirection: "row",
    flex: 1,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  }
})

export default function MainScreen(): React.ReactElement {
  const navigation = useNavigation();
  const limit = 50;
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('en');

  const fetchList = useCallback((page: number) => {
    setCurrentPage(page);
    setLoading(true);
    setPokemons([]);
    Axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page * limit}`)
      .then(({ data }) => {

        setCount(data.count);
        setHasNext(data.next !== null)
        setHasPrevious(data.previous !== null)
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
    fetchList(1);
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

  const handleChangeLang = useCallback((lang) => {
    I18n.locale = lang;
    setLanguage(lang);
  }, [])

  return (
    <Container>
      <Header>
        <Left />
        <Body style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../assets/images/pokemon.png')} style={styles.logo} />
        </Body>
        <Right>
          <Picker
            iosHeader="Select your language"
            iosIcon={(
              <Icon
                name="arrow-dropdown-circle"
                style={{ color: "#007aff", fontSize: 25 }}
              />
            )}
            mode="dropdown"
            onValueChange={handleChangeLang}
            selectedValue={language}
            style={{ color: "#ffffff", fontSize: 25, width: 50 }}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
          </Picker>
        </Right>
      </Header>
      <Header rounded searchBar>
        <Item>
          <Icon name="ios-search" />
          <Input
            onChangeText={text => handleSearch(text)}
            placeholder={I18n.t('search')}
          />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <Content>
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
        <View style={styles.paginator}>
          <Button disabled={!hasPrevious || loading} onPress={() => handleChangePage(currentPage - 1)}>
            <Text>
              {I18n.t('previous')}
            </Text>
          </Button>
          <Button disabled={!hasNext || loading} onPress={() => handleChangePage(currentPage + 1)}>
            <Text>
              {I18n.t('next')}
            </Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}
