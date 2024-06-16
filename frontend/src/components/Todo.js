import React, { useEffect, useState } from 'react';
import '../styles/Todo.css';
import ListItem from '@mui/material/ListItem';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOffIcon from '@mui/icons-material/EditOff';
import { Checkbox, IconButton, TextField } from '@mui/material';
import { taskService } from '../services/taskService';

const Todo = (props) => {
    // variables
    const [taskId] = useState(props.taskId);
    const [task, setTask] = useState(undefined);
    const [editTitle, setEditTitle] = useState(false);
    const [doneChanged, setDoneChanged] = useState(false);

    // fonctions
    const getTask = () => {
        taskService.getTask(taskId)
        .then(res => {
            setTask(res.data.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    useEffect(() => {
        getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const changeTask = () => {
        const taskBody = {data : {
            title : task.attributes.title,
            done : task.attributes.done,
            begin : task.attributes.begin,
            end : task.attributes.end
        }};
        taskService.changeTask(taskId, taskBody)
        .catch(e => {
            console.log(e);
        });
    }

    // handlers
    const handleChangeTitle = (e) => {
        setEditTitle(true);
        setTask({
            ...task,
            attributes : {
                ...task.attributes,
                [e.target.name] : e.target.value
            }
        })
    };
    const handleChangeDone = (e) => {
        if (task.attributes.done) {
            setTask({
                ...task,
                attributes : {
                    ...task.attributes,
                    done : false
                }
            })
        } else {
            setTask({
                ...task,
                attributes : {
                    ...task.attributes,
                    done : true
                }
            })
            setEditTitle(false);
        }
        setDoneChanged(true);
    };
    if (doneChanged) {
        changeTask();
        setDoneChanged(false);
    }
    const handleCancel = () => {
        setEditTitle(false);
        getTask();
    }
    const handleSave = () => {
        changeTask();
        setEditTitle(false);
    }
    const handleDelete = () => {
        taskService.deleteTask(taskId)
        .catch(e => {
            console.log(e);
        });
        props.reloadTasklist();
    }

    // affichage
    return (
            <ListItem id={taskId}>
                <div className='todoRow'>
                    <div className='taskInfo'>
                        <div className='taskCheckbox'>
                            <Checkbox checked={task ? (task.attributes.done && task.attributes.done ) : false} 
                            name="done" 
                            onChange={handleChangeDone}/>
                        </div>
                        <div className='taskTitle'>
                            <TextField
                                value={task ? task.attributes.title : ""}
                                className={task ? (task.attributes.done ? "crossed" : "") : ""}
                                disabled={task ? (task.attributes.done ? true : false) : false}
                                name="title"
                                onChange={handleChangeTitle}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                    </div>
                    { editTitle ? 
                    <div className='controlButtonsTwo'>
                        <div className='controlButton'>
                            <IconButton color="primary" sx={{width:'100%'}} onClick={handleCancel}>
                                <EditOffIcon fontSize='medium' />
                            </IconButton>
                        </div>
                        <div className='controlButton' sx={{width:'100%'}} onClick={handleSave}>
                            <IconButton color="primary">
                                <SaveIcon fontSize='medium' />
                            </IconButton>
                        </div> 
                    </div> : 
                    <div className='controlButtonsOne'>
                        <IconButton color="primary" sx={{width:'100%'}} onClick={handleDelete}>
                            <DeleteIcon fontSize='medium' />
                        </IconButton> 
                    </div>}
                </div>
            </ListItem>
    );
};

export default Todo;