import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import axiosSet from '../axiosConfig';
import { Helmet } from 'react-helmet-async';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import '../styles/ImageUpload.css';
import axios from 'axios';

const ImageUpload = () => {
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').min(0),
    imageFile: Yup.mixed().required('An image file is required'),
  });

  const imageUpload = async (values) => {
    console.log(values);

    try {
      const post = {
        title: values.title,
        description: values.description,
        tags: values.tags,
        price: values.price,
        imageFile: values.imageFile,
      };
      await axios.post('/url', {
        body: post,
      });

      // Successful upload new image, navigate to another route
      navigate('/home');
    } catch (error) {
      // Handle error if upload fails
      setError(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Upload new image</title>
      </Helmet>
      <Link to="/" className="d-flex justify-content-center">
        <h1 className="text-center mt-5">DevCorner</h1>
      </Link>
      <div className="imageUpload-body d-flex align-items-center justify-content-center flex-column mt-2">
        <Card
          className="imageUpload-card mt-4"
          variant="outlined"
          sx={{
            width: 800,
            padding: 1,
          }}
        >
          <CardHeader
            title="Image Upload"
            className="imageUpload-card-header mt-2"
            sx={{
              fontSize: 20,
            }}
          />
          <CardContent className="imageUpload-card-content">
            {error && <p className="error">{error}</p>}
            <Formik
              initialValues={{
                title: '',
                description: '',
                tags: '',
                price: '',
                imageFile: '',
              }}
              validationSchema={validationSchema}
              onSubmit={imageUpload}
            >
              <Form>
                <div>
                  <label>Title</label>
                  <Field
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter image title"
                    className="imageUpload-field"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label>Description</label>
                  <Field
                    component="textarea"
                    name="description"
                    id="description"
                    placeholder="Enter description"
                    rows="6"
                    className="textArea-field"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label>Tags</label>
                  <Field
                    type="text"
                    name="tags"
                    id="tags"
                    placeholder="Enter tags"
                    className="imageUpload-field"
                  />
                  <ErrorMessage name="tags" component="div" className="error" />
                </div>
                <div>
                  <label>Price</label>
                  <Field
                    type="number"
                    step=".01"
                    name="price"
                    id="price"
                    className="imageUpload-field"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label>Image file</label>
                  <Field
                    type="file"
                    accept="image/*"
                    name="imageFile"
                    id="imageFile"
                    className="imageUpload-field"
                  />
                  <ErrorMessage
                    name="imageFile"
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
                    Upload
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

export default ImageUpload;
