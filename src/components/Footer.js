import React from 'react';
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 text-center">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white">
                  111 anyST Calgary,
                  <br /> Alberta 2t2 2t2
                </address>
                <a
                  href="tel:+18253333333"
                  className="text-white d-block mt-2 mb-0"
                >
                  +1 (825) 333-3333
                </a>
                <a
                  href="mailto:imagecapstone@gmail.com"
                  className="text-white d-block mt-2 mb-0"
                >
                  imagecapstone@gmail.com
                </a>
              </div>
              <div className="social_icons d-flex align-items-center justify-content-center gap-15 mt-3">
                <Link className="text-white">
                  <BsFacebook className="fs-4" />
                </Link>
                <Link className="text-white">
                  <BsInstagram className="fs-4" />
                </Link>
                <Link className="text-white">
                  <BsYoutube className="fs-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Image-Store
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
