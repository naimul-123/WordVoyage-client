import React from 'react';
import Hero from '../components/Hero';
import Posts from '../components/Posts';
import Recent from '../components/Recent';
import Newslater from '../components/Newslater';

const Home = () => {
    return (
        <div>
            <Hero></Hero>

            <Recent></Recent>
            <Posts></Posts>
            <Newslater></Newslater>
        </div>
    );
};

export default Home;