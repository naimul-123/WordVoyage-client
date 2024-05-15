import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../authprovider/Authprovider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/addBlog">Add Blog</NavLink></li>
        <li><NavLink to="/allBlogs">All blogs</NavLink></li>
        <li><NavLink to="/featuredBlogs">Featured Blogs</NavLink></li>
        <li><NavLink to="/wishlist">Wishlist</NavLink></li>
        {!user && <li><NavLink to="/register">Register</NavLink></li>}
        {!user && <li><NavLink to="/login">Log in</NavLink></li>}
        {user && <li><Link onClick={logOut} >Logout</Link></li>}
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">WordVoyage</a>
            </div>
            <div className="navbar-center hidden lg:flex gap-2">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end group">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle group-hover:hidden avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                        <p></p>
                    </div>
                </div>
                <p className='hidden group-hover:block'>{user?.displayName}</p>
            </div>

        </div>
    );
};

export default Navbar;