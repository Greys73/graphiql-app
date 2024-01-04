'use client';
import { Select } from '@chakra-ui/react';
import LangContext from '@src/lib/LangContext';
import { Languages } from '@src/lib/constants/settings';
import { Languages as Lang } from '@src/lib/types/types';
import { useContext, ChangeEvent } from 'react';

const LangControl = () => {
  const { lang, setLang } = useContext(LangContext);
  const { en, ru } = Languages;
  const handler = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value as Lang;
    if (selectedLang && setLang) {
      localStorage.setItem('@base_language', selectedLang);
      setLang(Languages[selectedLang]);
    }
  };

  return (
    <Select
      rounded={4}
      variant='unstyled'
      defaultValue={lang.name}
      size={'sm'}
      onChange={handler}
      cursor={'pointer'}
    >
      <option value={en.name}>{en.label}</option>
      <option value={ru.name}>{ru.label}</option>
    </Select>
  );
};

export default LangControl;
