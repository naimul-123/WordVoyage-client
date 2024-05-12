import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddBlogs from "../pages/AddBlogs";
import AllBlogs from "../pages/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import Wishlist from "../pages/Wishlist";
import { QueryClient } from '@tanstack/react-query'
import PrivateRoute from "./PrivateRoute";
export const queryClient = new QueryClient()

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/addBlog',
                element: <PrivateRoute><AddBlogs></AddBlogs></PrivateRoute>
            },
            {
                path: '/allBlogs',
                element: <AllBlogs></AllBlogs>
            },
            {
                path: '/featuredBlogs',
                element: <FeaturedBlogs></FeaturedBlogs>
            },
            {
                path: '/wishlist',
                element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])

export default routes;