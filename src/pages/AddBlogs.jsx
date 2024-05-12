import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../authprovider/Authprovider";

const AddBlogs = () => {
    const { user } = useContext(AuthContext)
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

        axios.post('http://localhost:5000/addblogs', {
            title, imgUrl, catagory, shortDisc, longDesc, createdAt, authorName, authorEmail
        }).then(res => console.log(res.data)).catch(err => console.log(err.message))
        // fetch('http://localhost:5000/addblogs', {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "Application/json"
        //     },
        //     body: JSON.stringify(fromData)
        // })
        //     .then(res => res.json())
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err.message))

    }
    return (
        <div>
            <section className="p-6 text-gray-950">
                <form className=" grid grid-cols-1 lg:grid-cols-2 max-w-screen-md mx-auto gap-3 " onSubmit={handleSubmit}>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" name='title' placeholder="Blog title" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image Url</span>
                        </label>
                        <input type="text" name='imgUrl' placeholder="Image Url" className="input input-bordered" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Blog Catagory</span>
                        </label>
                        <select className="select select-bordered" defaultValue="" name='catagory'>
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
                        <input type="text" name='shortDisc' placeholder="Short Description" className="input input-bordered" required />
                    </div>
                    <div className="form-control col-span-full">
                        <label className="label">
                            <span className="label-text">Long Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" name='longDesc' placeholder="Long Description" required />
                    </div>

                    <div className="form-control col-span-full">
                        <button className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddBlogs;