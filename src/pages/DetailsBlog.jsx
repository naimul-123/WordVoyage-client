import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { AuthContext } from '../authprovider/Authprovider';
import axios from 'axios';
import CommentCard from '../components/CommentCard';

const DetailsBlog = () => {
    const { user } = useContext(AuthContext)
    const [enabled, setEnabaled] = useState(false)
    const { id } = useParams()
    const { isPending, isError, data: blog, error } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/blog/${id}`)
            return res.json();
        }

    })

    const fetchComments = async () => {
        await refetch();
        setEnabaled(true)
    }
    const { data: comments, refetch } = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/comments?blogId=${encodeURIComponent(id)}`)
            return res.json();
        },
        enabled: enabled
    })

    useEffect(() => {
        fetchComments()
    }, [id])
    if (isPending) {
        return
    }
    const { _id, title, imgUrl, catagory, shortDisc, longDesc, createdAt, authorName, authorEmail } = blog


    const localtime = new Date(createdAt).toLocaleString()
    const userName = user.displayName;
    const userEmail = user.email;
    const userPhoto = user.photoURL;
    const blogId = _id;

    const handleComment = (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        axios.post('http://localhost:5000/addComment', {
            comment, userName, userEmail, userPhoto, blogId
        }).then(res => {
            if (res.data.acknowledged) {
                fetchComments();
                e.target.reset();
            }
        }).catch(err => console.log(err.message))

    }

    console.log(comments)
    return (

        <section className="">
            <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
                <div rel="noopener noreferrer" className=" max-w-lg gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12">
                    <img src={imgUrl} alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7" />
                    <div className="p-6 space-y-2 lg:col-span-5">
                        <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">{title}</h3>
                        <span className="text-xs ">{localtime}</span>
                        <span className="text-xs "> Catagory: {catagory}</span>
                        <p>{longDesc}</p>
                    </div>
                </div>
                <div className='space-y-2'>
                    {
                        comments?.map((c) => <CommentCard key={c._id} c={c}></CommentCard>)
                    }
                </div>

                {
                    user.email !== authorEmail ? <div>
                        <form onSubmit={handleComment} className=''>
                            <div className='card-body space-y-3'>
                                <div className="form-control col-span-full">
                                    <label className="label">
                                        <span className="label-text">Comment:</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered h-24" name='comment' placeholder="Your Message" required />
                                </div>

                                <div className="form-control flex-shrink">
                                    <button className='btn btn-primary'>Submit</button>
                                </div>
                            </div>


                        </form>
                    </div> : <p>Can not comment on own blog</p>
                }


            </div>
        </section>
    );
};

export default DetailsBlog;