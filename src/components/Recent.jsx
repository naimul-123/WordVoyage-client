import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';

const Recent = () => {

    const { isPending, isError, data: recentBlogs, error } = useQuery({
        queryKey: ['recentBlogs'],
        queryFn: async () => {
            const res = await fetch('https://assignment-11-server-snowy-nine.vercel.app/recentBlogs')
            return res.json();
        }

    })



    // title, imgUrl, catagory, shortDisc, longDesc, createdAt, authorName, authorEmail

    return (
        <div>
            <div className="max-w-lg mx-auto text-center">
                <h2 className="text-5xl font-bold">Here our recent blog</h2>
                <p className="py-6">You explore here our recent blogs</p>

            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-2'>
                {recentBlogs?.map((blog) => <BlogCard key={blog._id} blog={blog}></BlogCard>)}
            </div>
        </div>
    );
};

export default Recent;