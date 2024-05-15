import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../authprovider/Authprovider';
import Swal from 'sweetalert2';

const Register = () => {
    const [isShow, setIsShow] = useState(false);
    const [authErr, setAuthErr] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const { createUser, logOut, updateUser } = useContext(AuthContext);



    const handelRegister = (data) => {
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const photoUrl = data.photo;
        createUser(email, password)
            .then(() => {
                updateUser(name, photoUrl)
                    .then(() => logOut())
                    .then(() => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Successfully register!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });

                        setTimeout(() => {
                            navigate('/login')
                        }, 2000)


                    });
            })
            .catch((error) => setAuthErr(error.message));
    };

    return (
        <div>
            <Helmet>
                <title>Register</title>
            </Helmet>

            <section className="p-6 container mx-auto  text-gray-950">
                <form className=" grid grid-cols-1 max-w-sm mx-auto gap-2 p-6 rounded-md shadow-sm " onSubmit={handleSubmit((data) => {
                    handelRegister(data);
                })}>


                    <div className="">
                        <label htmlFor="name" className="text-sm">Name</label>
                        <input {...register('name', { required: 'Name must be required.' })} id="name" type="text" placeholder="Name" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
                        {errors.name?.message && (
                            <p className='text-red-600'> {errors.name.message}</p>
                        )}
                    </div>

                    <div className="">
                        <label htmlFor="email" className="text-sm">Email</label>
                        <input  {...register('email', {
                            required: 'Email must be required.',
                        })} id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
                        {errors.email?.message && (
                            <p className='text-red-600'> {errors.email.message}</p>
                        )}

                    </div>
                    <div className="">
                        <label htmlFor="photo" className="text-sm">Photo Url</label>
                        <input {...register('photo', {
                            required: 'photo must be required.',
                        })} id="photo" type="text" placeholder="Photo Url" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
                        {errors.photo?.message && (
                            <p className='text-red-600'> {errors.photo.message}</p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <div className='relative flex items-center'>
                            <input type={isShow ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Password must be required.',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be atleast 6 charecters',
                                    },
                                    validate: {
                                        uppercase: (value) =>
                                            /[A-Z]/.test(value) ||
                                            'Password must have at least one uppercase letter.',
                                        lowercase: (value) =>
                                            /[a-z]/.test(value) ||
                                            'Password must have at least one lowercase letter.',
                                        Number: (value) =>
                                            /^(?=.*\d)/.test(value) ||
                                            'Password must have at least one Number.',
                                        special: (value) =>
                                            /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])/.test(value) ||
                                            'Password must have at least one Special Chareacter.',
                                    },
                                })} id="password" placeholder="Password" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
                            <span
                                className='absolute right-3 '
                                onClick={() => setIsShow(!isShow)}>
                                {isShow ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {errors.password?.message && (
                            <p className='text-red-600'> {errors.password.message}</p>
                        )}
                    </div>


                    <div className="col-span-full flex flex-col items-center space-x-2">

                        <button className="px-4 py-2 w-full bg-violet-600 text-white border rounded-md dark:border-gray-800">Register</button>
                    </div>
                    <div>
                        {authErr && (
                            <p className='text-red-600'> {authErr}</p>
                        )}
                        <p>Already have an account? Go to <Link to='/login' className="underline text-pink-500 font-bold">Login page</Link></p>
                    </div>
                </form>
            </section>



        </div>
    );
};

export default Register;













