import React from 'react';
import Hero from '../components/Hero';
import Posts from '../components/Posts';
import Recent from '../components/Recent';
import Newslater from '../components/Newslater';
import {
    motion,
    useMotionValue,
    useTransform,
} from "framer-motion"
const Home = () => {
    return (


        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>
            <Hero></Hero>

            <Recent></Recent>
            <Posts></Posts>
            <Newslater></Newslater>
        </motion.div>
    );
};

export default Home;