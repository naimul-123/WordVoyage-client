import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authprovider/Authprovider';
import { useQuery } from '@tanstack/react-query';
import BlogCard from '../components/BlogCard';
import axios from 'axios';
import { set } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const Wishlist = () => {
    const [wishedBlogs, setWishedBlogs] = useState([])
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const email = user?.email
    const url = `/mywishlist/${email}`
    // const { isPending, isError, data: blogs, error } = useQuery({
    //     queryKey: ['blogs'],
    //     queryFn: async () => {
    //         const res = await fetch(`http://localhost:5000/mywishlist/${email}`)
    //         return res.json();
    //     }

    // })
    useEffect(() => {
        axiosSecure.get(url, { withCredentials: true })
            .then(res => {
                setWishedBlogs(res.data)
            })
    }, [url])





    const removeWished = (id) => {
        console.log(id)
        axios.put('http://localhost:5000/removefromwish', {
            id, email
        })
            .then(res => {

                console.log(res.data)
                if (res.data.modifiedCount === 1) {
                    const reminingWished = wishedBlogs.filter(blog => blog._id !== id);
                    setWishedBlogs(reminingWished)
                }
            })

            .catch(err => console.log(err.message))
    }

    // console.log(blogs)
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-2'>
                {wishedBlogs?.map((blog) => <BlogCard key={blog._id} blog={blog} isWished={true} removeWished={removeWished}></BlogCard>)}
            </div>
        </div>
    );
};

export default Wishlist;