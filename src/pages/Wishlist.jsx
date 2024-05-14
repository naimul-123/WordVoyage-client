import React, { useContext } from 'react';
import { AuthContext } from '../authprovider/Authprovider';
import { useQuery } from '@tanstack/react-query';

const Wishlist = () => {
    const { user } = useContext(AuthContext)
    const { isPending, isError, data: blogs, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/mywishlist/${user?.email}`)
            return res.json();
        }

    })
    console.log(blogs)
    return (
        <div>

        </div>
    );
};

export default Wishlist;