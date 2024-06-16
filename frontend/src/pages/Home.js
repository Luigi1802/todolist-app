import React, { useEffect, useState } from 'react';
import { tasklistService } from '../services/tasklistService';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import Todolist from '../components/Todolist';
import { Alert, IconButton, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { authService } from '../services/authService';

const Home = () => {
    // variables
    const [taskLists, setTaskLists] = useState([]);
    const [alreadyExists, setAlreadyExists] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

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

    const createTasklist = (e) => {
        e.preventDefault();
        const tasklistBody = {data : {
            title : e.target[0].value,
            user: authService.getUserId(), 
            tasks : []
        }};
        tasklistService.createTasklist(tasklistBody)
        .then(() => {
            handleCloseDialog();
            getTasklists();
        })
        .catch(e => {
            if (e.code === "ERR_BAD_REQUEST") {
                setAlreadyExists(true);
            } else {
                console.log(e);
            }
        });
    }

    // handlers
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    // affichage
    return (
        <div className="Home">
            <Navbar />
            <div className="homeTitleRow">
                <div className="homeTitle">
                    <h1>Mes listes de tâches</h1>
                </div>
                <IconButton color="primary" onClick={handleOpenDialog}>
                    <AddBoxIcon sx={{height: "50px", width: "auto"}}/>
                </IconButton>  
            </div>
            <div className="todolists">
                {(taskLists.length > 0) && taskLists.map((taskList) => 
                    <div className="todolist" key={taskList.id}>
                        <Todolist taskListId={taskList.id} reloadTasklists={getTasklists}/>
                    </div>
                )}
            </div>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {createTasklist(event)},
                }}
            >
                <DialogTitle>Nouvelle todolist :</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="newTasklistTitle"
                        label="Titre"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    {alreadyExists && <Alert severity="error" sx={{mt:2}}>Cette todolist existe déjà.</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button sx={{mr:1, mb:1}} onClick={handleCloseDialog}>Annuler</Button>
                    <Button type="submit" sx={{mr:1, mb:1}} variant="contained">Ajouter</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Home;