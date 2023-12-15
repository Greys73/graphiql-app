import { AuthError, Session } from '@supabase/supabase-js';
import { UseFormRegisterReturn } from 'react-hook-form';
import { type IconType } from 'react-icons';
import { ReactCodeMirrorProps, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { MutableRefObject } from 'react';

export interface AuthInputType {
  name: string;
  register: UseFormRegisterReturn;
  invalidMessage?: string;
  type: 'password' | 'email' | 'text';
}

export interface SubmitAuth {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface AuthInputPasswordType {
  name: string;
  register: UseFormRegisterReturn;
  invalidMessage?: string;
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

export type TArea = {
  ref: MutableRefObject<ReactCodeMirrorRef>;
  format?: Function;
  readOnly?: ReactCodeMirrorProps['readOnly'];
  extensions?: ReactCodeMirrorProps['extensions'];
};
