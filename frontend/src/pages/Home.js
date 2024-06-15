import React from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className='Home'>
            <Navbar />
            <h1>todolist-app home</h1>
        </div>
    );
};

export default Home;