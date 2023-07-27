import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
    });

    const handleSubmit = async (values) => {
        try {
            await axios.post('/api/forgot-password', { email: values.email });
            setError('An email with instructions to reset your password has been sent.');
        } catch (error) {
            setError('Failed to send the password reset email. Please try again later.');
        }
    };

    return (
        <>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>
            <Link to="/" className="d-flex justify-content-center">
                <h1 className="text-center mt-5">DevCorner</h1>
            </Link>
            <div className="forgot-password-body d-flex align-items-center justify-content-center flex-column mt-2">
                <Card className="forgot-password-card mt-4 mb-4" variant="outlined">
                    <CardHeader
                        title="Forgot Password"
                        className="forgot-password-card-header mt-2"
                    />
                    <CardContent className="forgot-password-card-content">
                        {error && <p className="error">{error}</p>}
                        <Formik
                            initialValues={{
                                email: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="email-field-container">
                                    <label htmlFor="email" className="email-label">
                                        Email:
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className="forgot-password-field"
                                    />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <Button
                                        type="submit"
                                        className="mt-3"
                                        color="primary"
                                        variant="contained"
                                    >
                                        Reset Password
                                    </Button>
                                    <div className="mt-3">
                                        <NavLink to="/login">Remember your password? Sign in!</NavLink>
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

export default ForgotPassword;
