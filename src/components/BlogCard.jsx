import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaReadme } from "react-icons/fa";
import { FaHeart } from 'react-icons/fa6';
import { AuthContext } from '../authprovider/Authprovider';

const BlogCard = ({ blog }) => {
    const { user } = useContext(AuthContext)
    const { _id, title, imgUrl, catagory, shortDisc, longDesc, createdAt, authorName, authorEmail } = blog

    const handleWish = () => {
        const blogId = _id;


    }
    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure><img src={imgUrl} alt={title} /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                </h2>
                <span className='badge badge-warning'>{catagory}</span>
                <p>{shortDisc}</p>

                <div className="card-actions justify-end">
                    {user?.email === authorEmail && <Link to={`/edit/${_id}`} className='btn btn-primary'><FaEdit /></Link>}
                    <Link to={`/blog/${_id}`} className='btn btn-primary'><FaReadme /></Link>
                    <button className='btn btn-primary' onClick={handleWish}><FaHeart /></button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;