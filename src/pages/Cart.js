import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserContext } from '../contexts/UserContext';
import '../styles/Cart.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { styled } from '@mui/system';
import { TextField } from '@mui/material';

const StyledTextField = styled(TextField)(
  () => `
  width: 400px;
  font-size: 0.875rem;
  font-weight: 800;
  line-height: 1.5;`
);

const Cart = () => {
  const { user, userInfo, handleDeleteFromCart } = useContext(UserContext);
  const isEmpty = userInfo && userInfo.cart.length === 0;

  const cartTotalPrice = userInfo
    ? userInfo.cart
        .reduce((total, image) => total + parseFloat(image.price), 0)
        .toFixed(2)
    : 0;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const makePayment = async (values) => {
    try {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_P_KEYS);
      const imageIds = userInfo.cart.map((image) => image._id);
      const email = values.email;
      const token = user && (await user.getIdToken());
      const body = { imageIds, email };
      const headers = {
        'Content-Type': 'application/json',
        authtoken: token,
      };

      const response = await axios.post(
        '/api/payment/create-checkout-session',
        body,
        {
          headers: headers,
        }
      );

      const session = response.data;

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <section className="Cart-wrapper home-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            {!isEmpty && (
              <div className="col-12">
                <div className="cart-header d-flex justify-content-between align-items-center py-3 mb-2">
                  <h4 className="cart-col-1">Image</h4>
                  <h4 className="cart-col-2">Title</h4>
                  <h4 className="cart-col-3">Price</h4>
                  <h4 className="cart-col-4">Delete</h4>
                </div>
                {userInfo.cart.map((image) => (
                  <div className="cart-item d-flex justify-content-between align-items-center py-3 mb-2">
                    <div className="cart-col-1 d-flex align-items-center">
                      <Link to={`/image/${image._id}`}>
                        <img
                          src={image.imageLocation}
                          alt={image.title}
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                    <div className="cart-col-2">
                      <Link
                        to={`/image/${image._id}`}
                        state={{ image: image }}
                        onClick={() => console.log(image)}
                      >
                        <h5 className="title">{image.title}</h5>
                      </Link>
                    </div>
                    <div className="cart-col-3">
                      <h5 className="price">${image.price}</h5>
                    </div>
                    <div className="cart-col-4">
                      <DeleteIcon
                        onClick={() => handleDeleteFromCart(image._id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                ))}
                <div className="col-12 mt-4">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <Link className="button " to="/">
                      Continue to Shopping
                    </Link>
                    <div className="d-flex flex-column align-items-end">
                      <h4>{`SubTotal: $${cartTotalPrice}`}</h4>
                      <p>Taxes and shipping cakculated at checkout</p>
                    </div>
                  </div>
                </div>
                <div className="checkout-form col-12 mt-4">
                  <Formik
                    initialValues={{
                      email: userInfo.email,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={makePayment}
                  >
                    <Form>
                      <div className="d-flex justify-content-center mb-2">
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-center mb-4">
                        <label htmlFor="email" className="me-3">
                          Send Images To:
                        </label>
                        <Field
                          type="text"
                          as={StyledTextField}
                          name="email"
                          id="email"
                          placeholder="Enter your email"
                          className="signin-field"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button className="button">Checkout</button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            )}
            {isEmpty && (
              <div class="col-12 d-flex flex-column  justify-content-center align-items-center text-center">
                <div className="mb-5">
                  <h3>No image in the Cart</h3>
                </div>
                <div>
                  <Link className="button " to="/">
                    Go Shopping Now?
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
