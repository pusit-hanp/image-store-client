import React, { useContext } from 'react';
import '../styles/Profile.css';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const Profile = () => {
  //get the userId from URL
  const { user, userInfo, updateUser } = useContext(UserContext);

  const [error, setError] = useState();

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string().matches(
      /^[0-9\- ]{10}$/,
      'Phone number must contain 10 digits'
    ),
    address: Yup.string().required('Address is required'),
  });

  const handleSubmit = async (values) => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    try {
      const updatedUser = {
        ...userInfo,
        ...values,
      };

      updateUser(updatedUser, headers);
    } catch (error) {
      setError(error.message);
    }
  };

  //navigate('/profile/:userId');

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1 className="text-center mt-5">My Account</h1>
      <div className="profile-body d-flex align-items-center justify-content-center flex-column mt-2">
        <Card
          className="profile-card mt-4"
          variant="outlined"
          sx={{
            width: 600,
            padding: 1,
          }}
        >
          <CardHeader
            title="Account Information"
            className="profile-card-header mt-2"
            sx={{
              fontSize: 20,
            }}
          />
          <CardContent className="profile-card-content">
            {error && <p className="error">{error}</p>}
            <Formik
              initialValues={{
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                phone: userInfo.phone,
                address: userInfo.address,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div>
                  <label className="mt-3">First name:</label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="profile-field"
                  />
                </div>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />
                <div>
                  <label className="mt-3">Last name:</label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="profile-field"
                  />
                </div>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error"
                />
                <div>
                  <label className="mt-3">Email:</label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    className="profile-field"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="error" />
                <div>
                  <label className="mt-3">Phone:</label>
                  <Field
                    type="tel"
                    name="phone"
                    id="phone"
                    className="profile-field"
                  />
                </div>
                <ErrorMessage name="phone" component="div" className="error" />
                <div>
                  <label className="mt-3">Address:</label>
                  <Field
                    type="text"
                    name="address"
                    id="address"
                    className="profile-field"
                  />
                </div>
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error"
                />
                <div>
                  <Button
                    type="submit"
                    className="mt-3"
                    color="primary"
                    variant="contained"
                  >
                    Update profile
                  </Button>
                </div>
              </Form>
            </Formik>
          </CardContent>
        </Card>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default Profile;
