import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';

const AllBlogs = () => {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('')
    const { isPending, isError, data: blogs, error, refetch } = useQuery({
        queryKey: ['blogs', title, category],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/blogs?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`)
            return res.json();
        }
    })

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        refetch();
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        refetch();
    }

    return (
        <div>

            <div className=' mx-auto space-y-2 my-2 max-w-sm'>
                <div className="form-control max-w-xs">
                    <label className="label">
                        <span className="label-text">Filter blog by blog Catagory</span>
                    </label>
                    <select className="select select-bordered" defaultValue="" name='catagory' onChange={(e) => handleCategoryChange(e)}>
                        <option value="">Pick one</option>
                        <option value="programming">programming</option>
                        <option value="health & wellness">health & wellness</option>
                        <option value="remote work">remote work</option>
                        <option value="photography">photography</option>
                        <option value="home & decor">home & decor</option>
                        <option value="food & cooking">food & cooking</option>

                    </select>

                </div>
                <div className="form-control max-w-xs">

                    <input type="text" name='title' placeholder="Search blog by blog title" className="input input-bordered" required onChange={(e) => handleTitleChange(e)} />
                </div>

            </div>
            <div className='grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-2'>
                {blogs?.map((blog) => <BlogCard key={blog._id} blog={blog}></BlogCard>)}
            </div>
        </div >
    );
};

export default AllBlogs;