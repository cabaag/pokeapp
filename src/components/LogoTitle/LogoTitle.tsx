import React, { memo } from 'react';
import { Image } from 'react-native';

const LogoTitle = memo(() => (
  <Image
    source={require('../../assets/images/pokemon.png')}
    style={{ width: 140, height: 50 }}
  />
))
LogoTitle.displayName = 'LogoTitle'
export default LogoTitle;