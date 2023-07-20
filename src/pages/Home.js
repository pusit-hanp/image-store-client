import React, { useContext, useState } from 'react';
import '../styles/Home.css';
import ImageCardsPagination from '../components/ImageCardsPagination';
import { Helmet } from 'react-helmet-async';
import EditImageCard from '../components/EditImageCard';
import { ImageContext } from '../contexts/ImageContext';

const Home = () => {
  const { images, currentPage, totalPages, paginate } =
    useContext(ImageContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = (image) => {
    // set selected Image
    setSelectedImage(image);
    // Set the editImageCardVisible state to true
    setEditOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section className="home-wrapper py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Image Collection</h3>
            </div>
          </div>
          {selectedImage && (
            <>
              <EditImageCard
                selectedImage={selectedImage}
                editOpen={editOpen}
                setEditOpen={setEditOpen}
              />
            </>
          )}

          <ImageCardsPagination
            images={images}
            handleEdit={handleEdit}
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
