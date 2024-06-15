import '../styles/Login.css';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService.js';
import { Alert } from '@mui/material';

function Login() {
    // variables, usestates
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        identifier : '',
        password : ''
    });
    const [idInvalides, setIdInvalides] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // fonctions 
    const errorAlert = idInvalides ? <Alert className="alertLogin" variant="filled" severity="error">Identifiants incorrects</Alert> : null;
    const handleChange = (e) => {
        setIdInvalides(false);
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login(credentials)
            .then(res => {
                authService.saveToken(res.data.jwt);
                authService.saveUsername(res.data.user.username);
                navigate('/');  
            })
            .catch(error => {
                setIdInvalides(true);
            })
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    // affichage
    return(<div className="Login">
                <div className="loginContainer">
                    <div className="titleContainer">
                        <ChecklistIcon fontSize="large"/>
                        <h1 className="loginTitle">Todolist</h1>
                    </div>
                    <form className='formContainer' onSubmit={handleSubmit}>
                        <h3 className="formTitle">Connexion</h3>
                        {/* email */}
                        <div className='loginInputContainer'>
                            <FormControl variant="standard" className='loginInput'>
                                <InputLabel htmlFor="identifier">Adresse Email</InputLabel>
                                <Input
                                    fullWidth
                                    id="identifier"
                                    type='mail'
                                    sx={{
                                        ':before': { borderBottomColor: 'text.secondary' }
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end" sx={{pr:1, color: 'text.secondary'}}>
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                    name="identifier"
                                    value={credentials.identifier}
                                    onChange={handleChange}
                            />
                            </FormControl>
                        </div>
                        {/* password */}
                        <div className='loginInputContainer'>
                            <FormControl variant="standard" className='loginInput'>
                                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                                <Input
                                    fullWidth
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    sx={{
                                        ':before': { borderBottomColor: 'text.secondary' }
                                    }}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        sx={{ color: 'text.secondary' }}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </div>
                        {/* submit button */}
                        <div className='loginButton'>
                            <Button variant="contained" type="submit">Se connecter</Button>
                        </div>
                        <div>{errorAlert}</div>
                    </form>
                </div>
            </div>);
}

export default Login;