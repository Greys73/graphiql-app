import { LanguagesType } from '../types/types';
import { NamePages } from './pages';

const headerEN = {
  home: NamePages.Home,
  playground: NamePages.Editor,
  logout: 'LogOut',
  login: NamePages.Login,
  signup: NamePages.SignUp,
};

const headerRU = {
  home: 'Главная',
  playground: 'Редактор',
  logout: 'Выйти',
  login: 'Войти',
  signup: 'Регистрация',
};

const homeEN = {
  title: [`Welcome, my friend!`, `Welcome, are you new here?`],
  cards: {
    editor: {
      title: 'Editor',
      text: 'Our team has implemented a full-fledged GraphQL IDE! This is a fantastic developer tool to help you form queries and explore your Schema. Go to our online editor page, try, explore and implement your goals with us!',
      button: NamePages.Editor,
    },
    signup: {
      title: 'Yeap',
      text: `If you want to start using our application, then you need to register. We don't feel sorry for it, it's just what the customer demands. Don't worry, it won't take much time :)`,
      button: NamePages.SignUp,
    },
    login: {
      title: 'Nope',
      text: `Haven't seen you for a long time, go to the login page, I hope you haven't forgotten your account information? Otherwise, you will have to re-register, because... We did not implement the forgot password function :(`,
      button: NamePages.Login,
    },
  },
  about: {
    title: `About GraphQL Playground`,
    subtitle: `Greetings in GraphQL Playground!`,
    listTitle: `Dive into your API exploration journey here.`,
    listItem: [
      `Compose queries and mutations in the central panel in Request section.`,
      `Execute with the play button.`,
      `Get a response to a graphQL request in the Response section`,
    ],
    additionalText: ` For detailed schema info, check out the Docs tab.`,
    conclusion: `Happy querying!`,
  },
};

const homeRU = {
  title: ['Привет, друг!', 'Привет, ты здесь впервые?'],
  cards: {
    editor: {
      title: 'Редактор',
      text: `Наша команда разработала полноценную среду разработки GraphQL! Это фантастический инструмент для разработчиков, который поможет вам формировать запросы и исследовать предоставленную схему данных. Перейдите на нашу страницу редактора, попробуйте создать запрос, исследуйте редактор и достигайте поставленных целей вместе с нами!`,
      button: 'Редактор',
    },
    signup: {
      title: 'Ага',
      text: `
Если вы хотите пользоваться нашим приложением, вам необходимо зарегистрироваться. Нам не жалко, просто это требование заказчика. Не волнуйтесь, это не займет много времени :)`,
      button: 'Регистрация',
    },
    login: {
      title: 'Не-а',
      text: `Давно вас не видели, перейдите на страницу входа, надеюсь, вы не забыли свои данные для входа? В противном случае вам придется зарегистрироваться заново, потому что... мы не реализовали функцию восстановления пароля :(`,
      button: 'Вход',
    },
  },
  about: {
    title: `О GraphQL Редакторе`,
    subtitle: `Приветствуем в GraphQL Playground!`,
    listTitle: `Освойте свое путешествие по исследованию вашего API здесь.`,
    listItem: [
      `Формируйте запросы и мутации в центральной панели секции "Запрос".`,
      `Выполняйте их с помощью кнопки выполнения запроса.`,
      `Получайте ответ на запрос GraphQL в секции "Ответ".`,
    ],
    additionalText: `Для подробной информации о схеме обратитесь к вкладке "Документация".`,
    conclusion: `Счастливого исследования!`,
  },
};

const signupEN = {
  title: NamePages.SignUp,
  email: 'Email',
  password: 'Password',
  passwordConfirm: 'Password Confirm',
  github: 'Sign Up with GitHub',
  error: 'Registration failed',
  success: 'Thank You for Registration',
};

const signupRU = {
  title: 'Регистрация',
  email: 'Эл. почта Email',
  password: 'Пароль',
  passwordConfirm: 'Подтверждение пароля',
  github: 'Регистрация через GitHub',
  error: 'Ошибка регистрации',
  success: 'Регистрация выполнена успешно',
};

const loginEN = {
  title: NamePages.Login,
  email: 'Email',
  password: 'Password',
  login: 'Login',
  github: 'Login with GitHub',
};

const loginRU = {
  title: 'Авторизация',
  email: 'Эл. почта Email',
  password: 'Пароль',
  login: 'Войти',
  github: 'Вход через GitHub',
};

const editorEN = {
  title: NamePages.Editor,
  change: 'Change',
  request: 'Request',
  response: 'Response',
  variables: 'Variables',
  headers: 'Headers',
};

const editorRU = {
  title: 'Редактор',
  change: 'Изменить',
  request: 'Запрос',
  response: 'Ответ',
  variables: 'Переменные',
  headers: 'Заголовки',
};

const docsEN = {
  docs: 'Docs',
  title: 'Documentation',
  back: 'Back',
  fields: 'Fields',
  args: 'Arguments',
  rootTypes: 'Root Types',
  allTypes: 'All Schema Types',
};

const docsRU = {
  docs: 'Документация',
  title: 'Документация',
  back: 'Назад',
  fields: 'Поля ',
  args: 'Аргументы',
  rootTypes: 'Корневые Типы',
  allTypes: 'Все типы схемы',
};

export const Languages: LanguagesType = {
  en: {
    name: 'en',
    label: 'English',
    texts: {
      header: headerEN,
      home: homeEN,
      signup: signupEN,
      login: loginEN,
      logout: 'You have successfully logged out of your profile',
      editor: editorEN,
      docs: docsEN,
      welcomeMessage: 'Welcome, nice to see you again!',
      footer: {
        developers: 'Developers',
      },
    },
  },
  ru: {
    name: 'ru',
    label: 'Russian',
    texts: {
      header: headerRU,
      home: homeRU,
      signup: signupRU,
      login: loginRU,
      logout: 'Выход из профиля выполнен успешно',
      editor: editorRU,
      docs: docsRU,
      welcomeMessage: 'Привет, рады видеть тебя снова!',
      footer: {
        developers: 'Разработчики',
      },
    },
  },
};
