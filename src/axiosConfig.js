import axios from 'axios';

// const axiosSet = axios.create({
//   baseURL:
//     process.env.NODE_ENV === 'production'
//       ? 'https://image-store-app-api.onrender.com'
//       : 'http://localhost:8080',
// });

const axiosSet = axios.create({
  baseURL: 'https://image-store-app-api.onrender.com',
});

export default axiosSet;
