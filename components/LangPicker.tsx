import { Icon, Picker } from 'native-base';
import React, { useCallback, useState } from 'react';

const LangPicker: React.FC = () => {
  const [language, setLanguage] = useState('en');

  const handleChangeLang = useCallback((lang) => {
    console.log(lang);
  }, [])

  return (
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
      style={{ width: undefined }}
    >
      <Picker.Item label="Wallet" value="key0" />
      <Picker.Item label="ATM Card" value="key1" />
      <Picker.Item label="Debit Card" value="key2" />
      <Picker.Item label="Credit Card" value="key3" />
      <Picker.Item label="Net Banking" value="key4" />
    </Picker>
  );
}

export default LangPicker;