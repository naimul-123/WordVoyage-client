import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const { _id, title, imgUrl, catagory, shortDisc, longDesc, createdAt, authorName, authorEmail } = blog
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
                    <Link to={`/blog/${_id}`} className='btn btn-primary'>Details</Link>
                    <button className='btn btn-primary'>Add to wish</button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;