import * as yup from 'yup';

export const AuthenticationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  pass: yup.string().required('Password is required')
});
