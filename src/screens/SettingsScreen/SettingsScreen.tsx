import { Body, Col, Content, Row, Text } from 'native-base';
import React from 'react';
import LangPicker from '../../components/LangPicker/LangPicker';

const SettingsScreen: React.FC = () => {
  return (
    <Content padder>
      <Body>
        <Row>
          <LangPicker />
        </Row>
      </Body>
    </Content>
  )
}

export default SettingsScreen;