import axios from 'axios';
import {apiConfig} from './apiConfig.js';
import { authService } from './authService.js';

const getTask = (taskId) => {
    return axios.get(`${apiConfig.apiURL}/${apiConfig.getTasksRoute}/${taskId}`, 
        { headers: {"Authorization" : `Bearer ${authService.getToken()}`}}
    );
}

const changeTask = (taskId, taskBody) => {
    return axios.put(`${apiConfig.apiURL}/${apiConfig.getTasksRoute}/${taskId}`, 
        taskBody,
        { headers: {"Authorization" : `Bearer ${authService.getToken()}`}}
    );
}

const createTask = (taskBody) => {
    return axios.post(`${apiConfig.apiURL}/${apiConfig.getTasksRoute}/`, 
        taskBody,
        { headers: {"Authorization" : `Bearer ${authService.getToken()}`}}
    );
}

const deleteTask = (taskId) => {
    return axios.delete(`${apiConfig.apiURL}/${apiConfig.getTasksRoute}/${taskId}`, 
        { headers: {"Authorization" : `Bearer ${authService.getToken()}`}}
    );
}

export const taskService = {
    getTask, changeTask, createTask, deleteTask
}