import React, { useEffect, useState } from 'react';
import { tasklistService } from '../services/tasklistService';
import '../styles/Todolist.css';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';
import Todo from './Todo';
import { authService } from '../services/authService';
import { taskService } from '../services/taskService';

const Todolist = (props) => {
    // variables
    const [tasklist, setTasklist] = useState(undefined);
    const [taskListId] = useState(props.taskListId);
    const [editTodolist, setEditTodolist] = useState(false);

    // fonctions
    const getTasklist = () => {
        tasklistService.getTasklist(taskListId)
        .then(res => {
            setTasklist(res.data.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const handleCreate = () => {
        const taskBody = {data : {
            title : "",
            user: authService.getUserId(),
            tasklist: taskListId
        }};
        taskService.createTask(taskBody)
        .catch(e => {
            console.log(e);
        });
        getTasklist();
    }

    useEffect(() => {
        getTasklist();
    }, []);

    return (
        <div className='Todolist'>
            <div className='titleRow'>
                <div className='titleRowBegin'>
                    <div className='titleRowDelete'>
                        <IconButton color="primary">
                            <CloseIcon fontSize='medium'/>
                        </IconButton>
                    </div>
                    <h3>{tasklist && tasklist.attributes.title}</h3>
                </div>
                <div className='titleRowEditSave'>
                    { editTodolist ? 
                    <IconButton color="primary">
                        <SpellcheckIcon fontSize='medium'/>
                    </IconButton> : 
                    <IconButton color="primary">
                        <EditIcon fontSize='medium'/>
                    </IconButton> }
                </div>
            </div>
            <div className='todos'>
                <List>
                    { tasklist && 
                    (tasklist.attributes.tasks.data.length > 0 ? 
                    tasklist.attributes.tasks.data.map(task => 
                    <Todo taskId={task.id} reloadTasklist={getTasklist} key={task.id} />) :
                    <div className='noTask'>
                        <PlaylistRemoveIcon sx={{mr:1}}/>
                        <h3>Aucune tâche</h3>
                    </div>)
                    }
                </List>
            </div>
            <div className='addTodo'>
                <IconButton color="primary" onClick={handleCreate}>
                    <AddCircleOutlineIcon fontSize='large'/>
                </IconButton>           
            </div>
        </div>
    );
};

export default Todolist;