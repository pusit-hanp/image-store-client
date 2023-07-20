import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/Contact.css';
import { Button } from '@mui/material';
import { BiHome, BiInfoCircle, BiMailSend, BiPhoneCall } from 'react-icons/bi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    mobile: Yup.string().required('Mobile number is required'),
    comments: Yup.string().required('Comments are required'),
  });

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className="contact-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            {/* Wait for update client location */}
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40118.46615160014!2d-114.12355862089842!3d51.06408939999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f9268a69e81%3A0xb1db5e68bd61e28!2sSouthern%20Alberta%20Institute%20of%20Technology!5e0!3m2!1sfr!2sca!4v1686114684803!5m2!1sfr!2sca"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  {/* <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div>
                      <textarea
                        className="form-control w-100"
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="Comments"
                      ></textarea>
                    </div>
                    <Button>Submit</Button>
                  </form> */}
                  <Formik
                    initialValues={{
                      name: '',
                      email: '',
                      mobile: '',
                      comments: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                      // Handle form submission
                      console.log(values);
                      actions.setSubmitting(false);
                    }}
                  >
                    <Form className="d-flex flex-column gap-15">
                      <div>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div>
                        <Field
                          type="tel"
                          name="mobile"
                          className="form-control"
                          placeholder="Mobile Number"
                        />
                        <ErrorMessage
                          name="mobile"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div>
                        <Field
                          as="textarea"
                          name="comments"
                          className="form-control w-100"
                          placeholder="Comments"
                          rows="5"
                        />
                        <ErrorMessage
                          name="comments"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <Button type="submit">Submit</Button>
                    </Form>
                  </Formik>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Get in touch with us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <BiHome className="fs-5" />
                        <address className="mb-0">
                          111 anyST Calgary, Alberta 2t2 2t2
                        </address>
                      </li>
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel:+18253333333" className="d-block mb-0">
                          +1 (825) 333-3333
                        </a>
                      </li>
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <BiMailSend className="fs-5" />
                        <a href="mailto:aaa@gmail.com" className="d-block mb-0">
                          aaa@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <BiInfoCircle className="fs-5" />
                        <p className="mb-0"> Monday-Friday 10AM - 5PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
