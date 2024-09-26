import axios from "axios";
const AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_FIESTA_API_URL}`, // Địa chỉ cơ sở của API
    timeout: 10000, // Thời gian chờ tối đa (ms)
    headers: {
        'Content-Type': 'application/json', // Định dạng dữ liệu gửi đi là JSON
    },
    
});
AxiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;
       
        if (typeof error.response !== 'undefined' && error.response.status === 499 && error.response.data.message === "NEWACCESSTOKEN") {
            const newToken = error.response.data.token;
            localStorage.setItem('token', JSON.stringify(newToken));
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            console.log("SAVE NEW ACCESS TOKEN");
  
            try {
                const retryResponse = await axios(originalRequest);
                return retryResponse.data;
            } catch (retryError) {
              // sửa thông tin isLogin=false
  
                console.log("Error during retry:", retryError);
                return Promise.reject(retryError);
            }
        } else if (error.response.status === 499) {
          // Bắt lỗi token expired
  
        
  
        } else if (error.response.status === 400) {
  
          // Loi 400 tử server
  
        
        } else {
          
        }
  
        return Promise.reject(error);
    }
  );
  
  AxiosInstance.interceptors.request.use(
    async (config) => {
        const token = JSON.parse(localStorage.getItem('token'));
  
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            delete config.headers['Authorization'];
        }
        return config;
    },
    (error) => {
  
        Promise.reject(error)
    }
  );
  
  export default AxiosInstance;