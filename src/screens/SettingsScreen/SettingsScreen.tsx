import * as SecureStore from 'expo-secure-store';
import { Body, Content, Form, Icon, Item, Picker, Row } from 'native-base';
import React, { memo, useEffect, useState } from 'react';
import LangPicker from '../../components/LangPicker/LangPicker';

const SettingsScreen: React.FC = () => {
  const [pokemonsPerPage, setPokemonsPerPage] = useState(50);

  useEffect(() => {
    SecureStore.getItemAsync('pokemonsPerPage').then(ppp => setPokemonsPerPage(+(ppp ?? 50)))
  }, [])

  const handlePokemonsPerPage = (value: number) => {
    setPokemonsPerPage(value);
    SecureStore.setItemAsync('pokemonsPerPage', value.toString());
  }

  return (
    <Content padder>
      <Body>
        <Row> 
          <Form>
            <Item picker>
              <LangPicker />
            </Item>
            <Item picker>
              <Picker
                iosIcon={<Icon name="arrow-down" />}
                mode="dropdown"
                onValueChange={handlePokemonsPerPage}
                placeholder="Pokemons per page"
                placeholderIconColor="#007aff"
                placeholderStyle={{ color: "#bfc6ea" }}
                selectedValue={pokemonsPerPage}
                style={{ width: undefined, color: '#000' }}
              >
                <Picker.Item label="30" value="30" />
                <Picker.Item label="50" value="50" />
                <Picker.Item label="70" value="70" />
                <Picker.Item label="100" value="100" />
              </Picker>
            </Item>
          </Form>
        </Row>
      </Body>
    </Content>
  )
}

export default memo(SettingsScreen);