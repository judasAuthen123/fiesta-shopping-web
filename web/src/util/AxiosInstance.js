import axios from "axios";
const AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_FIESTA_API_URL}`, // Địa chỉ cơ sở của API
    timeout: 5000, // Thời gian chờ tối đa (ms)
    headers: {
        'Content-Type': 'application/json', // Định dạng dữ liệu gửi đi là JSON
    },
    
});
AxiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  );
export default AxiosInstance;