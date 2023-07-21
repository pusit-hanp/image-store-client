import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

import '../styles/ImageUpload.css';

const CustomImageField = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id={field.name}
        {...field}
        {...props}
        style={{ padding: '10px' }}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};

const ImageUpload = () => {
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const initialValues = {
    title: '',
    description: '',
    imageFile: null,
    price: '',
    tags: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    imageFile: Yup.mixed().required('An image file is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number'),
    tags: Yup.string().required('Tags are required'),
  });

  const [uploadCount, setUploadCount] = useState(0);

  const handleSubmit = async (values, { setFieldValue }) => {
    const imageFile = document.getElementById('imageFile').files[0];
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('tags', values.tags);
    formData.append('imageFile', imageFile);
    console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    try {
      await axios.post('/api/image/upload', formData, config);
      alert('The file is successfully uploaded');
      setUploadCount((prevCount) => prevCount + 1); // Increment the upload count
      setFieldValue('imageFile', null); // Reset the image field
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Upload new image</title>
      </Helmet>
      <div className="imageUpload-body d-flex align-items-center justify-content-center flex-column mt-2 mb-5">
        <Card className="imageUpload-card mt-4 py-1" variant="outlined">
          <CardHeader
            title="Image Upload"
            className="imageUpload-card-header mt-2"
          />
          <CardContent className="imageUpload-card-content">
            {error && <p className="error">{error}</p>}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              key={uploadCount} // Use upload count as the key to force re-mount on each upload
            >
              <Form>
                <div>
                  <label>Title</label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Enter image title"
                    className="imageUpload-field mb-2"
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
                    placeholder="Enter description"
                    rows="6"
                    className="textArea-field mb-2"
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
                    placeholder="Enter tags"
                    className="imageUpload-field mb-2"
                  />
                  <ErrorMessage name="tags" component="div" className="error" />
                </div>
                <div>
                  <label>Price</label>
                  <Field
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    className="imageUpload-field mb-2"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label>Image file</label>
                  <Field component={CustomImageField} name="imageFile" />
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
      </div>
    </>
  );
};

export default ImageUpload;
