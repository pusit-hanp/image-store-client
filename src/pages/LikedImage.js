import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Helmet } from 'react-helmet-async';
import ImageCardsPagination from '../components/ImageCardsPagination';
import { Link } from 'react-router-dom';

const LikedImage = () => {
  const { user, userInfo } = useContext(UserContext);
  const isEmpty = userInfo.likes.length === 0;

  const imagesPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const indexOfLastItem = currentPage * imagesPerPage;
  const indexOfFirstItem = indexOfLastItem - imagesPerPage;

  let currentItems;
  if (userInfo.likes.length <= imagesPerPage) {
    currentItems = userInfo.likes; // Use all images if there are fewer than imagesPerPage
  } else {
    currentItems = userInfo.likes.slice(indexOfFirstItem, indexOfLastItem);
  }

  useEffect(() => {
    setTotalPages(Math.ceil(userInfo.likes.length / imagesPerPage));
  }, [userInfo.likes.length, imagesPerPage]);

  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Helmet>
        <title>Liked Images</title>
      </Helmet>
      {user && (
        <section className="home-wrapper py-4">
          <div className="container-xxl">
            {!isEmpty && (
              <>
                <div className="row">
                  <div className="col-12">
                    <h3 className="section-heading">Your Liked Images</h3>
                  </div>
                </div>
                <ImageCardsPagination
                  images={currentItems}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                />
              </>
            )}
            {isEmpty && (
              <div class="col-12 d-flex flex-column  justify-content-center align-items-center text-center">
                <div className="m-5">
                  <h3>You does not have any liked Images</h3>
                </div>
                <div className="mb-5">
                  <Link className="button " to="/">
                    See more images?
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default LikedImage;
