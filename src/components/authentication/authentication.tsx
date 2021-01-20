import React from 'react';
import { Formik } from 'formik';
import TextField from '../form/text-field';
import { AuthenticationSchema } from '../schemas/form';
import { Link } from 'react-router-dom';
import { useAuth } from './auth-ctx';

const Authentication = () => {
  const authCtx = useAuth();
  return (
    <div>
      <Formik
        initialValues={{ email: '', pass: '' }}
        validationSchema={AuthenticationSchema}
        onSubmit={(value) => {
          console.log(value)
          authCtx.login(value.email)
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField label="Enter your email" name="email" />
            <TextField label="Enter your password" name="pass" />
            <button type="submit">Submit</button>
            <Link to="/register">Create an account</Link>
          </form>
        )}
      </Formik>
    </div>
  )
};

export default Authentication;
