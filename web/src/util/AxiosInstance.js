import axios from "axios";
const AxiosInstance = axios.create({
    baseURL: `http://192.168.1.13:3000/api`, // Địa chỉ cơ sở của API
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