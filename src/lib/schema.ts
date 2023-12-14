import * as yup from 'yup';

const STRONG_EMAIL_REGEXP =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const baseSchema = {
  email: yup
    .string()
    .required('Email address is required')
    .email('Invalid email address')
    .matches(STRONG_EMAIL_REGEXP, 'Invalid email address'),
};

const signUpSchema = {
  ...baseSchema,
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .matches(/\p{General_Category=Number}/u, 'Password must contain at least one number')
    .matches(/[\p{General_Category=Punctuation}\p{Symbol}]/u, 'Password must contain a special symbol')
    .matches(/\p{General_Category=Letter}/u, 'Password must contain at least one letter'),
  passwordConfirm: yup
    .string()
    .required('Password Confirm is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
};

const loginSchema = {
  ...baseSchema,
  password: yup.string().required('Password is required'),
};

export const getLoginSchema = () => yup.object().shape(loginSchema);

export const getSignUpSchema = () => yup.object().shape(signUpSchema);
