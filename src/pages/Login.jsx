import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../authprovider/Authprovider';

const Login = () => {
    const [authErr, setAuthErr] = useState('')
    const { signIn } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handelLogIn = (data) => {
        const email = data.email;
        const password = data.password;
        signIn(email, password)
            .then(result => console.log(result.user))
            .catch(err => setAuthErr(err.message))
    }
    return (
        <div>
            <div>
                <Helmet>
                    <title>Log in</title>
                </Helmet>
                <ToastContainer autoClose={1000} />
                <section className="p-6 container mx-auto  text-gray-950">
                    <form className=" grid grid-cols-1 gap-6 p-6 rounded-md shadow-sm " onSubmit={handleSubmit((data) => {
                        handelLogIn(data);
                    })}>




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
                            <label htmlFor="password" className="text-sm">Password</label>

                            <input {...register('password', {
                                required: 'Password must be required.',
                            })} type='password' name='password' id="password" placeholder="Password" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
                            {errors.password?.message && (
                                <p className='text-red-600'> {errors.password.message}</p>
                            )}



                        </div>


                        <div className="col-span-full flex flex-col items-center space-x-2">

                            <button className="px-4 py-2 w-full bg-violet-600 text-white border rounded-md dark:border-gray-800">Login</button>
                        </div>
                        <div>
                            {authErr && (
                                <p className='text-red-600'> {authErr}</p>
                            )}
                            <p>Already have an account? Go to <Link to='/register' className="underline text-pink-500 font-bold">Register page</Link></p>
                        </div>
                    </form>
                </section>



            </div>
        </div>
    );
};

export default Login;