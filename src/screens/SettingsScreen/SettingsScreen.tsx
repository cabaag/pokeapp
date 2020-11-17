import * as SecureStore from 'expo-secure-store';
import { Container, Content, Form, Icon, Item, Label, Picker } from 'native-base';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LangPicker from '../../components/LangPicker/LangPicker';

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const [pokemonsPerPage, setPokemonsPerPage] = useState(50);

  useEffect(() => {
    SecureStore.getItemAsync('pokemonsPerPage').then(ppp => setPokemonsPerPage(+(ppp ?? 50)))
  }, [])

  const handlePokemonsPerPage = (value: number) => {
    setPokemonsPerPage(value);
    SecureStore.setItemAsync('pokemonsPerPage', value.toString());
  }

  return (
    <Container>
      <Content padder>
        <Form>
          <Item picker>
            <Label>{t('language')}</Label>
            <LangPicker />
          </Item>
          <Item picker>
            <Label>{t('ppp')}</Label>
            <Picker
              iosIcon={<Icon name="arrow-down" />}
              mode="dropdown"
              onValueChange={handlePokemonsPerPage}
              placeholder={t('ppp')}
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
      </Content>
    </Container>
  )
}

export default memo(SettingsScreen);