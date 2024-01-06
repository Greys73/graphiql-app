import { localizedMessage } from '@src/utils/utils';
import * as yup from 'yup';

const STRONG_EMAIL_REGEXP =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getLoginSchema = (lang = 'en') => {
  const loginSchema = {
    email: yup
      .string()
      .required(localizedMessage('reqEmail', lang))
      .email(localizedMessage('invalEmail', lang))
      .matches(STRONG_EMAIL_REGEXP, localizedMessage('invalEmail', lang)),
    password: yup.string().required(localizedMessage('reqPass', lang)),
  };
  return yup.object().shape(loginSchema);
};

export const getSignUpSchema = (lang = 'en') => {
  const signUpSchema = {
    email: yup
      .string()
      .required(localizedMessage('reqEmail', lang))
      .email(localizedMessage('invalEmail', lang))
      .matches(STRONG_EMAIL_REGEXP, localizedMessage('invalEmail', lang)),
    password: yup
      .string()
      .required(localizedMessage('reqPass', lang))
      .min(8, localizedMessage('symbPass', lang))
      .matches(/\p{General_Category=Number}/u, localizedMessage('numPass', lang))
      .matches(/[\p{General_Category=Punctuation}\p{Symbol}]/u, localizedMessage('specPass', lang))
      .matches(/\p{General_Category=Letter}/u, localizedMessage('letPass', lang)),
    passwordConfirm: yup
      .string()
      .required(localizedMessage('reqPassConf', lang))
      .oneOf([yup.ref('password')], localizedMessage('matchPass', lang)),
  };

  return yup.object().shape(signUpSchema);
};
