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
