import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/Register.css';

const Register = () => {
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmedPasswordVisible, setConfirmedPasswordVisible] =
    useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]+$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special symbol'
      ),
    confirmPassword: Yup.string()
      .required('Re-enter password')
      .oneOf([Yup.ref('password')], 'Passwords are not the same'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phone: Yup.string().matches(
      /^[0-9\- ]{10}$/,
      'Phone number must contain 10 digits'
    ),
    address: Yup.string().required('Address is required'),
  });

  // const signUp = async (values) => {
  //   try {
  //     if (values.password !== values.confirmPassword) {
  //       setError('Password and Confirmed password do not match');
  //       return;
  //     }

  //     const newUser = await createUserWithEmailAndPassword(getAuth(), values.email, values.password);
  //     console.log(newUser.user.uid);

  //     const userData = {
  //       uid: newUser.user.uid,
  //       email: values.email,
  //       password: values.password,
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       phone: values.phone,
  //       address: values.address,
  //       role: "user",
  //       status:"inactive",
  //       cart: [],
  //       likes: [],
  //       transactions: [],
  //     };

  //     await axios.post('/user', userData);

  //     //Successful registration, navigate to login route
  //     navigate('/login');
  //   } catch (error) {
  //     // Handle error if registration fails
  //     setError(error.message);
  //   }
  // };

  const signUp = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        setError('Password and Confirmed password do not match');
        return;
      }
      const userData = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        address: values.address,
      };

      await axios.post('/api/user/register', userData);

      //Successful registration, navigate to login route
      navigate('/login');
    } catch (error) {
      // Handle error if registration fails
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmedPasswordVisibility = () => {
    setConfirmedPasswordVisible(!confirmedPasswordVisible);
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Link to="/" className="d-flex justify-content-center">
        <h1 className="text-center mt-5">DevCorner</h1>
      </Link>
      <div className="sign-up-body d-flex align-items-center justify-content-center flex-column mt-2">
        <Card
          className="signup-card mt-4 mb-4"
          variant="outlined"
          sx={{
            width: 600,
            padding: 1,
          }}
        >
          <CardHeader
            title="Register"
            className="signup-card-header mt-2"
            sx={{
              fontSize: 20,
            }}
          />
          <CardContent className="signup-card-content">
            {error && <p className="error">{error}</p>}
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
              }}
              validationSchema={validationSchema}
              onSubmit={signUp}
            >
              <Form>
                <div>
                  <label htmlFor="email" className="mt-3">
                    Email:
                  </label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Insert your email"
                    className="signup-field"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mt-3">
                    Password:
                  </label>
                  <div className="password-field">
                    <Field
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="signup-field"
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
                <div>
                  <label htmlFor="confirmPassword" className="mt-3">
                    Confirm Password:
                  </label>
                  <div className="password-field">
                    <Field
                      type={confirmedPasswordVisible ? 'text' : 'password'}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Re-enter your password"
                      className="signup-field"
                    />
                    {confirmedPasswordVisible ? (
                      <AiOutlineEye
                        className="password-icon"
                        onClick={toggleConfirmedPasswordVisibility}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="password-icon"
                        onClick={toggleConfirmedPasswordVisibility}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="firstName" className="mt-3">
                    First name:
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Insert your first name"
                    className="signup-field"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mt-3">
                    Last name:
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Insert your last name"
                    className="signup-field"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mt-3">
                    Phone:
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="1234567890"
                    className="signup-field"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="mt-3">
                    Address:
                  </label>
                  <Field
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Insert your address"
                    className="signup-field"
                  />
                  <ErrorMessage
                    name="address"
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
                    Sign up
                  </Button>
                  <div className="mt-3">
                    <NavLink to="/login">
                      Already have an account? Sign in!
                    </NavLink>
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

export default Register;
