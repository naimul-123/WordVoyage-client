import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [authErr, setAuthErr] = useState('')
    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handelLogIn = (data) => {
        const email = data.email;
        const password = data.password;
        signIn(email, password)
            .then(result => {
                if (result.user) {
                    const logedUser = result.user
                    axios.post('http://localhost:5000/jwt', logedUser, { withCredentials: true })
                        .then(res => {
                            if (res.data.success) {
                                navigate(location?.state ? location.state : '/')
                            }
                        })
                        .catch(err => console.log(err.message))

                }
            })
            .catch(err => setAuthErr(err.message))
    }
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                if (result.user) {
                    const logedUser = result.user
                    axios.post('http://localhost:5000/jwt', logedUser, { withCredentials: true })
                        .then(res => {
                            if (res.data.success) {
                                navigate(location?.state ? location.state : '/')
                            }
                        })
                        .catch(err => console.log(err.message))

                }
            })
            .catch(err => setAuthErr(err.message))
    }
    return (
        <div>
            <div>
                <Helmet>
                    <title>Log in</title>
                </Helmet>
                <ToastContainer autoClose={1000} />
                <section className=" container my-6 space-y-2   text-gray-950 p-6 rounded-md  max-w-sm mx-auto shadow-lg">
                    <h2 className='text-center text-4xl font-semibold text-primary'> Log in here</h2>

                    <form className=" grid grid-cols-1 gap-6  " onSubmit={handleSubmit((data) => {
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
                            <p>Don't have an account? Go to <Link to='/register' className="underline text-pink-500 font-bold">Register page</Link></p>
                        </div>
                    </form>
                    <div className="flex flex-col  items-center ">
                        <button className="btn  w-full btn-primary" onClick={handleGoogleLogin}>Log in with google</button>
                    </div>

                </section>



            </div>
        </div>
    );
};

export default Login;