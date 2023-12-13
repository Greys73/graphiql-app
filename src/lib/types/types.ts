import { AuthError, Session } from '@supabase/supabase-js';
import { UseFormRegisterReturn } from 'react-hook-form';
import { type IconType } from 'react-icons';

export interface AuthInputType {
  name: string;
  register: UseFormRegisterReturn;
  invalidMessage?: string;
  type: 'password' | 'email' | 'text';
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
