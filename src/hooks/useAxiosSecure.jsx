import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res
        }, err => {
            console.log(err.response)
            if (err.response.status === 401 || err.response.status === 403) {
                console.log('Logout the user');
                logOut().then(() => {
                    navigate('/login')
                }).catch(err => console.log(err.message))
            }
        })
    }, [])

    return axiosSecure
};

export default useAxiosSecure;