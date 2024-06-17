import axios from 'axios';
import {apiConfig} from './apiConfig.js';
import { jwtDecode } from 'jwt-decode';

const login = (credentials) => {
    return axios.post(`${apiConfig.apiURL}/${apiConfig.loginRoute}`, credentials);
}

const register = (credentials) => {
    return axios.post(`${apiConfig.apiURL}/${apiConfig.registerRoute}`, credentials);
}

let logout = () => {
    localStorage.removeItem('AuthToken');
    localStorage.removeItem('Username');
}

let isLogged = () => {
    const token = localStorage.getItem('AuthToken');
    return !!token;
} 

let saveToken = (token) => { 
    localStorage.setItem('AuthToken', token);
}

let saveUsername = (name) => { 
    localStorage.setItem('Username', name);
}

let getToken = () => {
    const token = localStorage.getItem('AuthToken');
    return token;
}

let getUserId = () => {
    const tokenData = jwtDecode(getToken());
    return tokenData.id;
}

let getUsername = () => {
    const username = localStorage.getItem('Username');
    return username;
}

export const authService = {
    login, saveToken, logout, isLogged, getToken, getUserId, register, getUsername, saveUsername
}