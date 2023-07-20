import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 24;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let url = `/api/images?page=${currentPage}&perPage=${imagesPerPage}`;

        // Check if user role is "admin"
        if (userInfo.role === 'admin') {
          // Append filter query parameter to fetch only "Active" images
          url += '&status=All';
        }

        const response = await fetch(url);
        const data = await response.json();
        setImages(data.images);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [currentPage, imagesPerPage, userInfo.role]);

  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const UpdateImage = async (image, headers) => {
    try {
      // Update Image in the database
      await axios.post('/api/images/update', image, { headers });

      // Refetch data
      try {
        const response = await fetch(
          `/api/images?page=${currentPage}&perPage=${imagesPerPage}`
        );
        const data = await response.json();
        setImages(data.images);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    } catch (error) {
      console.error('Error updating image:', error);
      // Handle the error appropriately (e.g., display an error message)
    }
  };

  return (
    <ImageContext.Provider
      value={{ images, currentPage, totalPages, paginate, UpdateImage }}
    >
      {children}
    </ImageContext.Provider>
  );
};
