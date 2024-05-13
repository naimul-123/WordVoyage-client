import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';

const AllBlogs = () => {
    const [queryText, setQueryText] = useState('')
    const { isPending, isError, data: blogs, error } = useQuery({
        queryKey: ['blogs', queryText],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/blogs?filter=${encodeURIComponent(queryText)}`)
            return res.json();
        }
    })

    return (
        <div>
            <div className='max-w-sm mx-auto'>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search blog" onChange={(e) => setQueryText(e.target.value)} />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
            </div>
            <div className='grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-2'>
                {blogs?.map((blog) => <BlogCard key={blog._id} blog={blog}></BlogCard>)}
            </div>
        </div>
    );
};

export default AllBlogs;