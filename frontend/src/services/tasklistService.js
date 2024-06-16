import axios from 'axios';
import {apiConfig} from './apiConfig.js';
import { authService } from './authService.js';

const getTasklist = (tasklistId) => {
    return axios.get(`${apiConfig.apiURL}/${apiConfig.getTasklistsRoute}/${tasklistId}?populate=*`, 
        { headers: {"Authorization" : `Bearer ${authService.getToken()}`}}
    );
}

const getTasklists = () => {
    return axios.get(`${apiConfig.apiURL}/${apiConfig.getTasklistsRoute}/`, 
        { headers: {"Authorization" : `Bearer ${authService.getToken()}`}}
    );
}

const changeTasklist = (tasklistId, taskListBody) => {
    return axios.put(`${apiConfig.apiURL}/${apiConfig.getTasklistsRoute}/${tasklistId}`, 
        taskListBody,
        { headers: {"Authorization" : `Bearer ${authService.getToken()}`}}
    );
}
const createTasklist = (taskListBody) => {
    return axios.post(`${apiConfig.apiURL}/${apiConfig.getTasklistsRoute}/`, 
        taskListBody,
        { headers: {"Authorization" : `Bearer ${authService.getToken()}`}}
    );
}
const deleteTasklist = (tasklistId) => {
    return axios.delete(`${apiConfig.apiURL}/${apiConfig.getTasklistsRoute}/${tasklistId}`,
        { headers: {"Authorization" : `Bearer ${authService.getToken()}`}}
    );
}

export const tasklistService = {
    getTasklists, getTasklist, changeTasklist, deleteTasklist, createTasklist
}