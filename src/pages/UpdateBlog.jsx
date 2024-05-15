import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../authprovider/Authprovider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const { isPending, isError, data: blog, error } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await fetch(`https://assignment-11-server-snowy-nine.vercel.app/blog/${id}`)
            return res.json();
        }

    })
    if (isPending) {
        return
    }
    const { _id, title, imgUrl, catagory, shortDisc, longDesc,
        createdAt, authorName, authorEmail } = blog
    // console.log(user)
    const handleSubmit = (e) => {
        e.preventDefault()
        const from = e.target;
        const title = from.title.value;
        const imgUrl = from.imgUrl.value;
        const catagory = from.catagory.value;
        const shortDisc = from.shortDisc.value;
        const longDesc = from.longDesc.value;
        const createdAt = new Date();
        const authorName = user.displayName;
        const authorEmail = user.email;
        const authorImg = user.photoURL


        axios.put('https://assignment-11-server-snowy-nine.vercel.app/updateblog', {
            _id, title, imgUrl, catagory, shortDisc, longDesc
        }).then(res => console.log(res.data)).catch(err => console.log(err.message))


    }
    return (
        <div>
            <section className="p-6 text-gray-950">
                <form className=" grid grid-cols-1 lg:grid-cols-2 max-w-screen-md mx-auto gap-3 " onSubmit={handleSubmit}>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" name='title' defaultValue={title} placeholder="Blog title" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image Url</span>
                        </label>
                        <input type="text" name='imgUrl' defaultValue={imgUrl} placeholder="Image Url" className="input input-bordered" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Blog Catagory</span>
                        </label>
                        <select className="select select-bordered" defaultValue={catagory} name='catagory'>
                            <option value="">Pick one</option>
                            <option value="programming">programming</option>
                            <option value="health & wellness">health & wellness</option>
                            <option value="remote work">remote work</option>
                            <option value="photography">photography</option>
                            <option value="home & decor">home & decor</option>
                            <option value="food & cooking">food & cooking</option>

                        </select>

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Short Description</span>
                        </label>
                        <input type="text" name='shortDisc' defaultValue={shortDisc} placeholder="Short Description" className="input input-bordered" required />
                    </div>
                    <div className="form-control col-span-full">
                        <label className="label">
                            <span className="label-text">Long Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" name='longDesc' defaultValue={longDesc} placeholder="Long Description" required />
                    </div>

                    <div className="form-control col-span-full">
                        <button className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </section>
        </div>
    );
};


export default UpdateBlog;