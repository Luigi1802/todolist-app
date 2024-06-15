import React, { useState } from 'react';
import '../styles/Todo.css';
import ListItem from '@mui/material/ListItem';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

import EditOffIcon from '@mui/icons-material/EditOff';
import { Checkbox, IconButton, TextField } from '@mui/material';

const Todo = (props) => {
    // variables
    const [todoData, setTodoData] = useState(props.data);
    const [editTitle, setEditTitle] = useState(false);

    return (
            <ListItem>
                <div className='todoRow'>
                    <div className='taskInfo'>
                        <div className='taskCheckbox'>
                            <Checkbox/>
                        </div>
                        <div className='taskTitle'>
                            <TextField
                                value={todoData.attributes.title}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                    </div>
                    { editTitle ? 
                    <div className='controlButtonsTwo'>
                        <div className='controlButton'>
                            <IconButton color="primary" sx={{width:'100%'}}>
                                <EditOffIcon fontSize='medium' />
                            </IconButton>
                        </div>
                        <div className='controlButton' sx={{width:'100%'}}>
                            <IconButton color="primary">
                                <SaveIcon fontSize='medium' />
                            </IconButton>
                        </div> 
                    </div> : 
                    <div className='controlButtonsOne'>
                        <IconButton color="primary" sx={{width:'100%'}}>
                            <DeleteIcon fontSize='medium' />
                        </IconButton> 
                    </div>}
                </div>
            </ListItem>
    );
};

export default Todo;