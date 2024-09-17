import axios from "axios";
import { URL } from './constants';

const instance = axios.create({
    baseURL: URL,
    withCredentials: true,
});

export const commonRequest = async (method, route, body = null, headers = {}) => {

    const requestConfig = {
        method,
        url: route,
        data: body,
        headers: {
            ...headers, 
        },
        withCredentials: true,
    };


    if (headers['Content-Type'] === 'multipart/form-data') {
        delete requestConfig.headers['Content-Type']; 
    } else {
        requestConfig.headers['Content-Type'] = 'application/json';
    }

    try {
       
        const response = await instance(requestConfig);
        return response;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};
