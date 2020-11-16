import { Icon, Picker } from 'native-base';
import React, { useCallback, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

const LangPicker: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLang = useCallback((lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }, [])

  return (
    <Picker
      iosHeader={t("select_lang")}
      iosIcon={(
        <Icon
          name="arrow-dropdown-circle"
        />
      )}
      mode="dropdown"
      onValueChange={handleChangeLang}
      placeholder={t("select_lang")}
      selectedValue={language}
      

    >
      <Picker.Item label={t("english")} value="en" />
      <Picker.Item label={t("spanish")} value="es" />
    </Picker>
  );
}

export default memo(LangPicker);