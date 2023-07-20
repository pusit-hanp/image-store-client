import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import '../styles/Login.css';

const Login = () => {
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const signIn = async (values) => {
    try {
      //Implement firebase auth
      await signInWithEmailAndPassword(
        getAuth(),
        values.email,
        values.password
      );
      // Successful login, navigate to another route
      navigate(redirect || '/');
    } catch (error) {
      // Handle error if login fails
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Link to="/" className="d-flex justify-content-center">
        <h1 className="text-center mt-5">DevCorner</h1>
      </Link>
      <div className="sign-in-body d-flex align-items-center justify-content-center flex-column mt-2">
        <Card
          className="signin-card mt-4"
          variant="outlined"
          sx={{
            width: 300,
            padding: 1,
          }}
        >
          <CardHeader
            title="Sign In"
            className="signin-card-header mt-2"
            sx={{
              fontSize: 20,
            }}
          />
          <CardContent className="signin-card-content">
            {error && <p className="error">{error}</p>}
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={signIn}
            >
              <Form>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="signin-field"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mt-3">
                    Password
                  </label>

                  <div className="password-field">
                    <Field
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="signin-field"
                    />
                    {passwordVisible ? (
                      <AiOutlineEye
                        className="password-icon"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="password-icon"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="d-flex flex-column align-items-center">
                  <Button
                    type="submit"
                    className="mt-3"
                    color="primary"
                    variant="contained"
                  >
                    Sign in
                  </Button>
                  <div className="mt-3">
                    <NavLink to="/forgot-password">Forgot password?</NavLink>
                    <Link to={`/register?redirect=${redirect}`}>
                      Don't have an account yet? Sign up!
                    </Link>
                  </div>
                </div>
              </Form>
            </Formik>
          </CardContent>
        </Card>
        <footer className="py-4 fixed-bottom">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <p className="text-center mb-0 text-white">
                  &copy; {new Date().getFullYear()}; Developer's Corner
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Login;
