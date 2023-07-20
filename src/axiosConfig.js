import axios from 'axios';

const axiosSet = axios.create({
    baseURL: "http://localhost:8080",
})

export default axiosSet;