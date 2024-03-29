import { EditorView } from '@codemirror/view';

export const toOneWord = (words: string) => words.split(' ').join('').toLowerCase().trim();

export const jsonFormat = (code: string) => {
  try {
    return { text: JSON.stringify(JSON.parse(code), null, 2), error: null };
  } catch (error) {
    return { text: null, error: `error formatting JSON: ${(error as Error).message}` };
  }
};

export const setViewText = (view: EditorView, text: string) => {
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: text },
  });
};

export const localizedMessage = (text: string, lang = 'en') => {
  switch (text) {
    case 'reqPass':
      return lang === 'en' ? 'Password is required' : 'Пароль обязателен';
    case 'reqEmail':
      return lang === 'en' ? 'Email address is required' : 'Email адрес обязателен';
    case 'invalEmail':
      return lang === 'en' ? 'Invalid email address' : 'Некорректный email адрес';
    case 'symbPass':
      return lang === 'en'
        ? 'Password must contain at least 8 characters'
        : 'Пароль должен содержать не менее 8 символов';
    case 'numPass':
      return lang === 'en'
        ? 'Password must contain at least one number'
        : 'Пароль должен содержать не менее 1 цифры';
    case 'specPass':
      return lang === 'en'
        ? 'Password must contain a special symbol'
        : 'Пароль должен содержать не менее 1 спец. символа';
    case 'letPass':
      return lang === 'en'
        ? 'Password must contain at least one letter'
        : 'Пароль должен содержать не менее 1 буквы';
    case 'reqPassConf':
      return lang === 'en' ? 'Password Confirm is required' : 'Подтверждение пароля обязательное поле';
    case 'matchPass':
      return lang === 'en' ? 'Passwords must match' : 'Пароли должны совпадать';
    case 'apiError':
      return lang === 'en' ? 'API Error' : 'Ошибка API';
    case 'requestError':
      return lang === 'en' ? 'Request Error' : 'Ошибка запроса';
    default:
      return 'error_message';
  }
};

export const minimizeMessage = (text: string) => (text.length > 30 ? `${text.substring(0, 25)}...` : text);
