import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

const STRONG_EMAIL_REGEXP =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const baseSchema = {
  email: yup
    .string()
    .email('Invalid email address')
    .matches(STRONG_EMAIL_REGEXP, 'Invalid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .minNumbers(1, 'Password must contain at least one number')
    .minSymbols(1, 'Password must contain at least one symbol')
    .matches(/^(?=.*[а-яА-Яa-zA-Z]).*$/, 'Password must contain at least one letter')
    .required('Password is required'),
};

const signUpSchema = {
  ...baseSchema,
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password Confirm is required'),
};

export const getLoginSchema = () => yup.object().shape(baseSchema);

export const getSignUpSchema = () => yup.object().shape(signUpSchema);
