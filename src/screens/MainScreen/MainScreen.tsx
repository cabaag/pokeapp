import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Button, Container, Content, Header, Icon, Input, Item, Row, Segment, Spinner, Text } from 'native-base';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, RefreshControl, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Paginator from '../../components/Paginator/Paginator';
import PokeCard from '../../components/PokeCard/PokeCard';
import { retrievePokemons } from '../../services/Pokemon';
import { Pokemon } from '../../types/Pokemon';

const styles = StyleSheet.create({
  grid: {
    flex: 1,
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
    height: '100%'
  },
  row: {
    width: (Dimensions.get('window').width - 16),
    flex: 1,
    paddingBottom: 8,
  }
})

export default function MainScreen(): React.ReactElement {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);
  const [layout, setLayout] = useState('grid');

  const fetchList = useCallback((newPage: number) => {
    setPokemons([]);
    setPage(newPage);
    setLoading(true);

    retrievePokemons(limit, newPage * limit)
      .then(result => {
        setCount(result.count);
        setPokemons(result.results);
      })
      .catch(e => console.log(e))
      .finally(() => {
        setLoading(false)
      })

  }, [])

  const changeLayout = useCallback((newLayout: string) => {
    setLayout(newLayout)
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Segment>
          <Button active={layout === 'grid'} first onPress={() => changeLayout('grid')}><Icon name="grid" /></Button>
          <Button active={layout === 'list'} last onPress={() => changeLayout('list')}><Icon name="list" /></Button>
        </Segment>
      )
    })
  }, [navigation, layout]);

  useEffect(() => {
    SecureStore.getItemAsync('pokemonsPerPage').then(ppp => setLimit(+(ppp ?? 50)))
    fetchList(0);
  }, []);


  const handleChangePage = useCallback((newPage) => {
    fetchList(newPage);
  }, [])

  const handlePressPokemon = useCallback((pokemon: Pokemon) => {
    navigation.navigate('PokemonDetailsScreen', { pokemonName: pokemon.name });
  }, [])

  const handleSearch = useCallback((newSearch: string) => {
    setSearch(newSearch)
  }, [])

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchList(page);
  }, [page])

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
      <Content refreshControl={(
        <RefreshControl
          onRefresh={handleRefresh}
          progressBackgroundColor="#fff"
          refreshing={refreshing}
        />
      )}
      >
        <Paginator count={count} limit={limit} loading={loading} onChangePage={handleChangePage} />
        <View style={{
          ...styles.grid,
          flexDirection: layout === 'grid' ? 'row' : 'column',
          flexWrap: layout === 'grid' ? 'wrap' : 'nowrap'
        }}
        >
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
                    <TouchableOpacity
                      key={pokemon?.name}
                      onPress={() => handlePressPokemon(pokemon)}
                      style={layout === 'grid' ? styles.col : styles.row}
                    >
                      <PokeCard direction={layout === 'grid' ? 'column' : 'row'} pokemonName={pokemon.name} />
                    </TouchableOpacity>
                  )
                )
          }
        </View>
      </Content>
    </Container>
  );
}
