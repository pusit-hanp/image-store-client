import React from 'react';
import { Pagination } from '@mui/material';
import ImageCard from './ImageCard';

const ImageCardsPagination = ({
  images,
  handleEdit,
  currentPage,
  totalPages,
  paginate,
}) => {
  return (
    <>
      <div className="row">
        {images.map((image) => (
          <ImageCard key={image._id} image={image} handleEdit={handleEdit} />
        ))}
      </div>
      <div className="pagination-container d-flex align-items-center justify-content-center mt-5">
        <Pagination count={totalPages} page={currentPage} onChange={paginate} />
      </div>
    </>
  );
};

export default ImageCardsPagination;
