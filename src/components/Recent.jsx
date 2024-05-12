import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Recent = () => {
    const { isPending, isError, data: recentBlogs, error } = useQuery({
        queryKey: ['recentBlogs'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/recentBlogs')
            return res.json();
        }

    })

    console.log(recentBlogs)
    return (
        <div>

        </div>
    );
};

export default Recent;