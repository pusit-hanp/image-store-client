import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserContext } from '../contexts/UserContext';
import '../styles/Cart.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const { user, handleDeleteFromCart } = useContext(UserContext);

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { cart: [] };

  const isEmpty = userInfo && userInfo.cart.length === 0;

  const cartTotalPrice = userInfo
    ? userInfo.cart
        .reduce((total, image) => total + parseFloat(image.price), 0)
        .toFixed(2)
    : 0;

  const makePayment = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_P_KEYS);
    const product = userInfo.cart;
    const body = { product };
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      'http://localhost:8080/payment/create-checkout-session',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
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
                      <div onClick={makePayment}>
                        <Link className="button">Checkout</Link>
                      </div>

                      {/* <form
                        action="http://localhost:8080/create-checkout-session"
                        method="POST"
                      >
                        <Link className="button">Checkout</Link>
                      </form> */}
                    </div>
                  </div>
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
