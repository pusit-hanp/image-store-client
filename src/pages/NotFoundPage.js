import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@mui/material';
import '../styles/NotFoundPage.css'; // Import custom styles for the NotFoundPage

const NotFoundPage = () => {
    return (
        <>
            <Header />
            <div className="not-found-page">
                <h1 className="not-found-heading">404 - Page Not Found</h1>
                <p className="not-found-text">The page you are looking for does not exist.</p>
                <div className="d-flex flex-column align-items-center">
                    <Link to="/">
                    <Button
                        type="submit"
                        className="mt-3"
                        color="primary"
                        variant="contained"
                    >
                        Go Back to Home
                    </Button>
                    </Link>
            </div>

            </div>
            <Footer />
        </>
    );
};

export default NotFoundPage;
