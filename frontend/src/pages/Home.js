import React, { useEffect, useState } from 'react';
import { tasklistService } from '../services/tasklistService';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import Todolist from '../components/Todolist';

const Home = () => {
    // variables
    const [taskLists, setTaskLists] = useState([]);

    // fonctions
    const getTasklists = () => {
        tasklistService.getTasklists()
            .then(res => {
                setTaskLists(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTasklists(); 
    }, []);

    return (
        <div className="Home">
            <Navbar />
            <div className="homeTitle">
                <h1>Mes listes de tâches</h1>
            </div>
            <div className="todolists">
                <div className="todolist">
                    {taskLists.length > 0 && <Todolist taskListId={taskLists[0].id}/>}
                </div>
            </div>
        </div>
    );
};

export default Home;