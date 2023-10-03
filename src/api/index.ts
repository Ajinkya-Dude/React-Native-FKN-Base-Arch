import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { INTEGRATION_API } from '../../env';

// Create an Axios instance with custom configuration
const api: AxiosInstance = axios.create({
    baseURL: INTEGRATION_API, // Your API's base URL
});

// Define a function to set authentication headers if needed
export function setAuthToken(token: string): void {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Define a function to make a GET request
export function get<T>(url: string, config?: AxiosRequestConfig) {
    return api.get<T>(url, config);
}

// Define a function to make a POST request
export function post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    console.log("Post api",url,"Data",data);
    
    return api.post<T>(url, data, config);
}

// Add other API request functions as needed (PUT, DELETE, etc.)

export default api;
