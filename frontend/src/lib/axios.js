import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api", //Point axios to nodeJs Backend
    withCredentials: true, //Sends cookies in all requests
})