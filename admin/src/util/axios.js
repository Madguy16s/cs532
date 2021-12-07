import { create } from 'axios';
import { SERVER_URL } from './CONSTANTS';
import { getToken } from './storage';

let axiosInstance = create({
    baseURL: SERVER_URL
});

axiosInstance.interceptors.request.use(async config => {
    const token = await getToken()
    config.headers.Authorization = token;
    return config
})

export default axiosInstance