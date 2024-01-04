import { MutableRefObject, ReactNode, SetStateAction, Dispatch } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { type IconType } from 'react-icons';
import { AuthError, Session } from '@supabase/supabase-js';
import { ReactCodeMirrorProps, ReactCodeMirrorRef } from '@uiw/react-codemirror';

export interface AuthInputType {
  name: string;
  register: UseFormRegisterReturn;
  invalidMessage?: string;
  type: 'password' | 'email' | 'text';
  icon: IconType;
  lang?: Languages;
}

export interface SubmitAuth {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface AuthCardType {
  icon: IconType;
  heading: string;
  text: string;
  buttonText: string;
  buttonPath: string;
}

export interface CheckAuthProps {
  isAuth: Session | null;
  errorAuth: AuthError | null;
}

export interface WelcomePageProps extends CheckAuthProps {}
export interface HeaderProps extends CheckAuthProps {}
export interface AuthNavPanelProps extends CheckAuthProps {}

export interface EditorPageProps {
  errorAuth: AuthError | null;
}

export type TEntity = {
  name: string;
  field: string | null;
};

export type TArea = {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  ref: MutableRefObject<ReactCodeMirrorRef>;
  format?: Function;
  readOnly?: ReactCodeMirrorProps['readOnly'];
  extensions?: ReactCodeMirrorProps['extensions'];
};

export type TAreas = { [key: string]: TArea };

export type TBoxCode = {
  name: string;
  options: TArea;
  children?: ReactNode;
};

export type Languages = 'en' | 'ru';

type HomeCard = {
  title: string;
  text: string;
  button: string;
};

type HomeAbout = {
  title: string;
  subtitle: string;
  listTitle: string;
  listItem: string[];
  additionalText: string;
  conclusion: string;
};

type LanguageTexts = {
  header: Record<string, string>;
  home: {
    title: string[];
    cards: Record<string, HomeCard>;
    about: HomeAbout;
  };
  signup: Record<string, string>;
  login: Record<string, string>;
  logout: string;
  footer: {
    developers: string;
  };
};

export type LanguageItem = {
  name: Languages;
  label: 'English' | 'Russian';
  texts: LanguageTexts;
};

export type LanguagesType = Record<Languages, LanguageItem>;
export interface LangContextType {
  lang: LanguageItem;
  setLang: Dispatch<SetStateAction<LanguageItem>> | null;
}
