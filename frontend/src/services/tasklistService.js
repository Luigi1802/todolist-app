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

export const tasklistService = {
    getTasklists, getTasklist
}