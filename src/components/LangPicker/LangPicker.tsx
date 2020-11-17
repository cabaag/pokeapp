import { Icon, Picker } from 'native-base';
import React, { useCallback, useState, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';

const LangPicker: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    SecureStore.getItemAsync('language').then(lang => setLanguage(lang ?? language))
  }, [])
  
  const handleChangeLang = useCallback((lang) => {
    i18n.changeLanguage(lang);
    SecureStore.setItemAsync('language', lang);
    setLanguage(lang);
  }, [])

  return (
    <Picker
      iosHeader={t("language")}
      iosIcon={(
        <Icon
          name="arrow-dropdown-circle"
        />
      )}
      mode="dropdown"
      onValueChange={handleChangeLang}
      placeholder={t("language")}
      selectedValue={language}
    >
      <Picker.Item label={t("english")} value="en" />
      <Picker.Item label={t("spanish")} value="es" />
    </Picker>
  );
}

export default memo(LangPicker);