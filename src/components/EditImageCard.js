import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Fade, MenuItem, Modal, Paper, TextField } from '@mui/material';
import '../styles/EditImageCard.css';
import { styled } from '@mui/system';
import MultipleSelectChip from './MultipleSelectChip';
import axios from 'axios';
import { ImageContext } from '../contexts/ImageContext';
import { UserContext } from '../contexts/UserContext';

const tagOptions = [
  'Exploration and Production',
  'Refining and Processing',
  'Transportation and Distribution',
  'Renewable Energy and Sustainability',
  'Economics and Markets',
  'Health, Safety, and Environment (HSE)',
  'Technology and Innovation',
];

const StyledTextField = styled(TextField)(
  () => `
  width: 500px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;`
);

const EditImageCard = ({ selectedImage, editOpen, setEditOpen }) => {
  const { user } = useContext(UserContext);
  const { UpdateImage } = useContext(ImageContext);
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required'),
    tags: Yup.array().min(1, 'Tag is required').required('Tag is required'),
  });

  const handleSubmit = async (values) => {
    // Make an API call or call a function to update the image with the new values
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    try {
      const image = {
        ...selectedImage,
        ...values,
      };

      UpdateImage(image, headers);

      setEditOpen(false);
    } catch (error) {
      // Handle error if update fails
      setError(error.message);
      setEditOpen(false);
    }
  };

  return (
    <>
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        className="edit-module mt-5 "
      >
        <Fade in={editOpen}>
          <Paper className="edit-form p-3">
            <Formik
              initialValues={{
                title: selectedImage.title,
                description: selectedImage.description,
                status: selectedImage.status,
                price: selectedImage.price,
                tags: selectedImage.tags,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="row">
                  <div className="edit-content col-5 d-flex align-items-center justify-content-between">
                    <img
                      src={selectedImage.imageLocation}
                      alt={selectedImage.title}
                    />
                  </div>
                  <div className="edit-content col-7">
                    <div className="form-field">
                      <label htmlFor="title">Title </label>
                      <Field
                        type="text"
                        as={StyledTextField}
                        id="title"
                        name="title"
                        placeholder="Enter Image Title"
                        className="edit-field"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="description">Description</label>
                      <Field
                        type="text"
                        as={StyledTextField}
                        multiline
                        id="description"
                        name="description"
                        placeholder="Enter Image Description"
                        className="edit-field"
                        minRows={3}
                        maxRows={4}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="price">Price </label>
                      <Field
                        type="number"
                        as={StyledTextField}
                        id="price"
                        name="price"
                        placeholder="Enter Image Price"
                        className="edit-field"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="tags">Tags </label>
                      <Field
                        type="text"
                        name="tags"
                        component={MultipleSelectChip}
                        names={tagOptions}
                      />
                      <ErrorMessage
                        name="tags"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="status">Status </label>
                      <Field
                        as={StyledTextField}
                        select
                        id="status"
                        name="status"
                        className="edit-field"
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Deactive">Deactive</MenuItem>
                        <MenuItem value="Sold">Sold</MenuItem>
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="edit-image-button">
                      <Button type="submit" color="primary" variant="contained">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default EditImageCard;
