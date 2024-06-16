import React, { useEffect, useState } from 'react';
import { tasklistService } from '../services/tasklistService';
import '../styles/Todolist.css';
import { IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';
import Todo from './Todo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { authService } from '../services/authService';
import { taskService } from '../services/taskService';

const Todolist = (props) => {
    // variables
    const [tasklist, setTasklist] = useState(undefined);
    const [taskListId] = useState(props.taskListId);
    const [editTitle, setEditTitle] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

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
    const deleteTaskList = () => {
        tasklistService.deleteTasklist(taskListId)
        .then(() => {
            handleCloseDialog();
            props.reloadTasklists();
        })
        .catch(e => {
            console.log(e);
        });
    }

    // handlers
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
    const handleChangeTitle = (e) => {
        setTasklist({
            ...tasklist,
            attributes : {
                ...tasklist.attributes,
                title : e.target.value
            }
        })
    };
    const handleUpdateTitle = () => {
        setEditTitle(false);
        const tasklistBody = {data : {
            title : tasklist.attributes.title
        }};
        tasklistService.changeTasklist(taskListId, tasklistBody)
        .catch(e => {
            console.log(e);
        });
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    useEffect(() => {
        getTasklist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='Todolist'>
            <div className='titleRow'>
                <div className='titleRowBegin'>
                    <div className='titleRowDelete'>
                        <IconButton color="primary" onClick={handleOpenDialog}>
                            <CloseIcon fontSize='medium'/>
                        </IconButton>
                        <Dialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                        >
                            <DialogTitle>Supprimer la todolist "{tasklist && tasklist.attributes.title}" ?</DialogTitle>
                            <DialogActions>
                                <Button sx={{mr:1, mb:1}} onClick={handleCloseDialog}>Annuler</Button>
                                <Button sx={{mr:1, mb:1}} variant="contained" onClick={deleteTaskList}>Valider</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    {editTitle ? 
                    <TextField
                    value={tasklist ? tasklist.attributes.title : ""}
                    className="editableTitle"
                    name="title"
                    onChange={handleChangeTitle}
                    variant="standard"
                    fullWidth
                    />: 
                    <h3>{tasklist && tasklist.attributes.title}</h3> }
                </div>
                <div className='titleRowEditSave'>
                    { editTitle ? 
                    <IconButton color="primary" onClick={handleUpdateTitle}>
                        <SpellcheckIcon fontSize='medium'/>
                    </IconButton> : 
                    <IconButton color="primary" onClick={() => {setEditTitle(true)}}>
                        <EditIcon fontSize='medium'/>
                    </IconButton> }
                </div>
            </div>
            <div className='todos'>
                <List sx={{maxHeight: 330, overflow: 'auto'}}>
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