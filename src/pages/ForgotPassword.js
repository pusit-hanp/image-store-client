import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import '../styles/Login.css';
import { ImageContext } from '../contexts/ImageContext';


const ForgotPassword = () => {


    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email is required'),
    });

    const [error] = useState('');
    const {setCategory} = useContext(ImageContext);
    const navigate = useNavigate();

    function resetPassword(value) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, value.email).then(() => {
            alert(`Reset email sent to ${value.email}`);
            navigate('/login');
        })
        .catch((err) => {
            const errorCode = err.code;
            if (errorCode === "auth/invalid-email") {
                alert("Invalid email! Try again");
            } else if (errorCode === "auth/user-not-found") {
                alert("Email not found! Try again");
            } else {
                alert(errorCode);
            } 
        });
    };

    return (
        <>
            <Helmet>
                <title>Forgot password</title>
            </Helmet>
            <Link
                to="/"
                className="d-flex justify-content-center"
                onClick={() => setCategory(null)}
            >
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
                            }}
                            validationSchema={validationSchema}
                            onSubmit={resetPassword}
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
                                <div className="d-flex flex-column align-items-center">
                                    <Button
                                        type="submit"
                                        className="mt-3"
                                        color="primary"
                                        variant="contained"
                                    >
                                        Send reset link
                                    </Button>
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