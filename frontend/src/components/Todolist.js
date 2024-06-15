import React, { useState } from 'react';
import '../styles/Todolist.css';
import { IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';
import Todo from './Todo';

const Todolist = () => {
    // variables
    const [todolist, setTodolist] = useState({
        "id": 1,
        "attributes": {
          "title": "Courses alimentaires",
          "createdAt": "2024-06-15T07:48:04.449Z",
          "updatedAt": "2024-06-15T07:49:21.799Z",
          "publishedAt": "2024-06-15T07:48:58.160Z",
          "user": {
            "data": {
              "id": 1,
              "attributes": {
                "username": "Luigi18",
                "email": "luigiaubrypouget@gmail.com",
                "provider": "local",
                "confirmed": true,
                "blocked": false,
                "createdAt": "2024-06-15T07:41:34.283Z",
                "updatedAt": "2024-06-15T07:41:34.283Z"
              }
            }
          },
          "tasks": {
            "data": [
              {
                "id": 1,
                "attributes": {
                  "title": "Poivrons",
                  "done": false,
                  "begin": null,
                  "end": null,
                  "createdAt": "2024-06-15T07:44:32.254Z",
                  "updatedAt": "2024-06-15T10:41:44.910Z",
                  "publishedAt": "2024-06-15T07:49:12.667Z"
                }
              },
              {
                "id": 2,
                "attributes": {
                  "title": "Beurre",
                  "done": false,
                  "begin": null,
                  "end": null,
                  "createdAt": "2024-06-15T07:48:32.595Z",
                  "updatedAt": "2024-06-15T10:41:07.759Z",
                  "publishedAt": "2024-06-15T07:49:05.179Z"
                }
              },
              {
                "id": 3,
                "attributes": {
                  "title": "Oeufs",
                  "done": false,
                  "begin": null,
                  "end": null,
                  "createdAt": "2024-06-15T07:48:51.865Z",
                  "updatedAt": "2024-06-15T10:41:40.391Z",
                  "publishedAt": "2024-06-15T07:49:10.537Z"
                }
              }
            ]
          }
        }});
    const [editTodolist, setEditTodolist] = useState(false);

    return (
        <div className='Todolist'>
            <div className='titleRow'>
                <div className='titleRowBegin'>
                    <div className='titleRowDelete'>
                        <IconButton color="primary">
                            <CloseIcon fontSize='medium'/>
                        </IconButton>
                    </div>
                    <h3>{todolist.attributes.title}</h3>
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
                    <Todo data={todolist.attributes.tasks.data[1]}/>
                    <Todo data={todolist.attributes.tasks.data[2]}/>
                </List>
            </div>
            <div className='addTodo'>
                <IconButton color="primary">
                    <AddCircleOutlineIcon fontSize='large'/>
                </IconButton>           
            </div>
        </div>
    );
};

export default Todolist;