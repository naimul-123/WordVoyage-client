import React from 'react';
import Hero from '../components/Hero';
import Posts from '../components/Posts';
import Recent from '../components/Recent';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Posts></Posts>
            <Recent></Recent>
        </div>
    );
};

export default Home;