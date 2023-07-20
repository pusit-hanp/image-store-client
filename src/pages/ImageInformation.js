import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/ImageInformation.css';
import {
  Button,
  IconButton,
  ThemeProvider,
  createTheme,
  styled,
} from '@mui/material';
import {
  BsCartCheck,
  BsCartPlus,
  BsSuitHeart,
  BsSuitHeartFill,
} from 'react-icons/bs';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const CartButton = styled(Button)(({ theme, disabled }) => ({
  padding: '0.5rem 1rem',
  backgroundColor: disabled ? theme.palette.grey[400] : '#ffe666',
  color: disabled ? theme.palette.text.secondary : '#1c1c1b',
  '&:hover': {
    backgroundColor: disabled ? theme.palette.grey[400] : '#ffd900',
  },
}));

const theme = createTheme({
  palette: {
    buyNow: {
      main: '#ffad33',
      text: '#1c1c1b',
    },
  },
});

const ImageInformation = () => {
  const { user, handleAddToCart, handleToggleLike } = useContext(UserContext);

  const [image, setImage] = useState(null);
  //const [status, setStatus] = useState({ isLiked: false, isInCart: false });
  const [loading, setLoading] = useState(true);
  const { imageId } = useParams();

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { cart: [], likes: [] };

  useEffect(() => {
    const loadImageInfo = async () => {
      // const token = user && (await user.getIdToken());
      // const header = token ? { authtoken: token } : {};
      //const response = await axios.get(`/api/images/${imageId}`, { header });
      try {
        const response = await axios.get(`/api/images/${imageId}`);
        console.log(response.data);
        setImage(response.data.image);
        //setStatus(response.data.status);
      } catch (error) {
        console.log('Error loading image data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImageInfo();
  }, []);

  // const location = useLocation();
  // //console.log(location);
  // const image = location.state && location.state.image;

  if (loading) {
    return (
      <div className="loading-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="loading-container">
        <h1>Image not found</h1>;
      </div>
    );
  }

  const isLiked =
    userInfo &&
    userInfo.likes.some((likedImage) => likedImage._id === image._id);
  const isInCart =
    userInfo && userInfo.cart.some((cartImage) => cartImage._id === image._id);

  return (
    <>
      <Helmet>
        <title>{image.title}</title>
      </Helmet>
      <div className="image-wrapper m-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-8 d-flex align-items-center justify-content-center">
              <img src={image.imageLocation} alt={image.title} />
            </div>
            <div className="col-4">
              <div className="image-detail">
                <h1 className="image-title mb-3">{image.title} </h1>
                <p className="image-description mb-2">
                  <span className="me-1">Description: </span>
                  {image.description.length > 300
                    ? `${image.description.substr(0, 299)}...`
                    : `${image.description.substr(0, 299)}`}
                </p>
                <div className="image-categories d-flex align-items-center mb-2">
                  <p className="me-2 mb-0">Tag:</p>
                  <div className="category-buttons d-flex flex-wrap">
                    {image.tags.sort().map((category) => (
                      <Link
                        to=""
                        className="d-flex align-items-center"
                        key={category}
                      >
                        <Button className="m-1">{category}</Button>
                      </Link>
                    ))}
                  </div>
                </div>
                <p className="image-price">
                  <span className="me-1">Price: </span>${image.price}{' '}
                </p>
                <div className="like-icon">
                  {user &&
                    userInfo.role === 'user' &&
                    (isLiked ? (
                      <IconButton
                        edge="end"
                        aria-label="modify"
                        type="button"
                        style={{ color: '#f474b4' }}
                        onClick={() => handleToggleLike(image)}
                      >
                        <BsSuitHeartFill className="fs-2" />
                      </IconButton>
                    ) : (
                      <IconButton
                        edge="end"
                        aria-label="modify"
                        type="button"
                        style={{ color: '#f474b4' }}
                        onClick={() => handleToggleLike(image)}
                      >
                        <BsSuitHeart className="fs-2" />
                      </IconButton>
                    ))}
                </div>
              </div>
              <div className="action-bar mt-4">
                <CartButton
                  className="addToCart"
                  fullWidth={true}
                  onClick={() => handleAddToCart(image)}
                  disabled={isInCart}
                >
                  {isInCart ? (
                    <>Already In Cart</>
                  ) : (
                    <>
                      Add To Cart <BsCartPlus className="fs-4 ms-2" />
                    </>
                  )}
                </CartButton>

                <ThemeProvider theme={theme}>
                  <Button
                    className="buyItNow mt-3"
                    variant="contained"
                    color="buyNow"
                    fullWidth={true}
                  >
                    Buy It Now <BsCartCheck className="fs-4 ms-2" />
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </div>
        </div>
        .
      </div>
    </>
  );
};

export default ImageInformation;
