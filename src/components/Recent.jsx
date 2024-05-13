import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';

const Recent = () => {

    const { isPending, isError, data: recentBlogs, error } = useQuery({
        queryKey: ['recentBlogs'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/recentBlogs')
            return res.json();
        }

    })



    // title, imgUrl, catagory, shortDisc, longDesc, createdAt, authorName, authorEmail

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-2'>
                {recentBlogs?.map((blog) => <BlogCard key={blog._id} blog={blog}></BlogCard>)}
            </div>
        </div>
    );
};

export default Recent;