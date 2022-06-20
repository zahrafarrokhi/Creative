import axios from 'axios';
// when accessToken expires, use refreshToken to get new accessToken
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// Create axios instance.
const axiosInstance = axios.create({
  // baseURL: process.env.BACKEND_BASE_URL,  #becuse for confing on next.config.js and traefik
  withCredentials: true,
  headers: {
    common: {
      'Accept-Language': 'ir',
    },
  },
});

export const setupInterceptors = (store) => {


  createAuthRefreshInterceptor(axiosInstance, (failedRequest) => {
    return axiosInstance
    // TokenRefreshSerializer ,220,221
      .post('/api/auth/refresh/', {
        user_id: store.getState().authReducer?.username,
        refresh: store.getState().authReducer?.refreshToken,
      })
      .then((resp) => {
        // TokenRefreshSerializer ,237
        const { access_tok: accessToken } = resp.data;
        const bearer = `${
          process.env.JWT_AUTH_HEADER ?? 'Bearer'
        } ${accessToken}`;
        console.log(accessToken);
        axiosInstance.defaults.headers.Authorization = bearer;

       
        failedRequest.response.config.headers.Authorization = bearer;
        return Promise.resolve();
      })
    }
  );
};




// Create axios interceptor
export default axiosInstance;
