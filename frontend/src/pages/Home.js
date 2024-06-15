import React from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import Todolist from '../components/Todolist';

const Home = () => {
    return (
        <div className="Home">
            <Navbar />
            <div className="homeTitle">
                <h1>Mes listes de tâches</h1>
            </div>
            <div className="todolists">
                <div className="todolist">
                    <Todolist/>
                </div>
            </div>
        </div>
    );
};

export default Home;