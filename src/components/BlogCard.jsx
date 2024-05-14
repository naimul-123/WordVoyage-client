import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaReadme } from "react-icons/fa";
import { FaHeart, FaHeartCircleMinus, FaHeartCirclePlus } from 'react-icons/fa6';
import { AuthContext } from '../authprovider/Authprovider';
import axios from 'axios';

const BlogCard = ({ blog, isWished, removeWished }) => {
    const { user } = useContext(AuthContext)
    const { _id, title, imgUrl, catagory, shortDisc, longDesc, createdAt, authorName, authorEmail } = blog

    const handleWish = () => {
        const email = user?.email
        axios.put('http://localhost:5000/addtowish', {
            _id, email
        }).then(res => console.log(res.data)).catch(err => console.log(err.message))



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

                    {isWished ? <button className='btn btn-primary' onClick={() => removeWished(_id)}><FaHeartCircleMinus /></button> :
                        <button className='btn btn-primary' onClick={handleWish}><FaHeartCirclePlus /></button>}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;