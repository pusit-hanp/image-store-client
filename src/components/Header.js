import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BiCart, BiLike, BiMenu, BiSearch, BiUser } from 'react-icons/bi';
import '../styles/Header.css';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const { user, handleSignOut } = useContext(UserContext);

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const cartImageCount = userInfo ? userInfo.cart.length : 0;
  const cartTotalPrice = userInfo
    ? userInfo.cart
        .reduce((total, image) => total + parseFloat(image.price), 0)
        .toFixed(1)
    : 0;

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Online shipping</p>
            </div>
            <div className="col-5">
              <p className="text-end text-white mb-0">
                Hotline:{' '}
                <a className="text-white" href="tel:+18253333333">
                  +1 (825) 333-3333
                </a>
              </p>
            </div>
            <div className="col-1">
              <NavLink to="/contact" className="text-end text-white mb-0">
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to="/">
                  DevCorner
                </Link>
              </h2>
            </div>
            <div className="col-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Image Here..."
                  aria-label="Search Image Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  <BiSearch className="fs-5" />
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    className="link d-flex align-items-center gap-10 text-white p-1"
                    to={user ? `/liked` : '/login?redirect=/liked'}
                  >
                    <BiLike className="fs-1" />
                    <p className="mb-0">
                      Liked
                      <br />
                      Images
                    </p>
                  </Link>
                </div>
                <div>
                  {user ? (
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <BiUser className="fs-1" />
                        <p className="mb-0">
                          {userInfo.firstName} {userInfo.lastName.slice(0, 1)}.
                        </p>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to="/profile"
                          >
                            User Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to="/order-history"
                          >
                            Order History
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link
                      className="link d-flex align-items-center gap-10 text-white p-1"
                      to="/login"
                    >
                      <BiUser className="fs-1" />
                      <p className="mb-0">Sign In</p>
                    </Link>
                  )}
                </div>
                <div className="cart-container">
                  <Link
                    className="link d-flex align-items-center gap-10 text-white p-1"
                    to={`/cart`}
                  >
                    <BiCart className="fs-1" />
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark d-block text-center">
                        {cartImageCount}
                      </span>
                      <p className="mb-0">$ {cartTotalPrice}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-2">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <BiMenu />
                      <span className="me-5 d-inline-block">Categories </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="#">
                          Exploration and Production
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">
                          Refining and Processing
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">
                          Transportation and Distribution
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">
                          Renewable Energy and Sustainability
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">
                          Economics and Markets
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">
                          Health, Safety, and Environment (HSE)
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">
                          Technology and Innovation
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-9">
              {userInfo && userInfo.role === 'admin' && (
                <div>
                  <NavLink to="/image/imageUpload" className="text-white mb-0">
                    Image Management
                  </NavLink>
                </div>
              )}
            </div>
            <div className="col-1">
              {user != null && (
                <div>
                  <NavLink
                    to="/"
                    className="text-end text-white mb-0"
                    onClick={() => handleSignOut()}
                  >
                    Sign out
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
