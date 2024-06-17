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
import BadgeIcon from '@mui/icons-material/Badge';
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
        username : '',
        email : '',
        password : ''
    });
    const [idInvalides, setIdInvalides] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [register, setRegister] = useState(false);

    // fonctions 
    const errorAlert = idInvalides ? <Alert className="alertLogin" variant="filled" severity="error">{alertMessage}</Alert> : null;
    const handleChange = (e) => {
        setIdInvalides(false);
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginCredentials = {
            identifier : credentials.email,
            password : credentials.password
        };
        authService.login(loginCredentials)
            .then(res => {
                authService.saveToken(res.data.jwt);
                authService.saveUsername(res.data.user.username);
                navigate('/');  
                setRegister(false);
            })
            .catch(error => {
                setAlertMessage("Identifiants incorrects");
                setIdInvalides(true);
            })
    }
    const handleRegister = () => {
        authService.register(credentials)
            .then(res => {
                setRegister(false);
            })
            .catch(error => {
                setAlertMessage("Informations incorrectes");
                setIdInvalides(true);
            })
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const loginForm = () => {
        return (<>
        <h3 className="formTitle">Connexion</h3>
            <div className='loginInputContainer'>
                <FormControl variant="standard" className='loginInput'>
                    <InputLabel htmlFor="mail-login">Adresse Email</InputLabel>
                    <Input
                        id="mail-login"
                        fullWidth
                        type='mail'
                        sx={{
                            ':before': { borderBottomColor: 'text.secondary' }
                        }}
                        endAdornment={
                            <InputAdornment position="end" sx={{pr:1, color: 'text.secondary'}}>
                                <AccountCircle />
                            </InputAdornment>
                        }
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                />
                </FormControl>
            </div>
            <div className='loginInputContainer'>
                <FormControl variant="standard" className='loginInput'>
                    <InputLabel htmlFor="password-login">Mot de passe</InputLabel>
                    <Input
                        id="password-login"
                        fullWidth
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
            <div className='loginButton'>
                <Button variant="contained" type="submit">Se connecter</Button>
            </div>
            <div className='loginButton'>
                <Button variant="outlined" onClick={()=>{setRegister(true);setIdInvalides(false);}} sx={{mb:2}}>S'inscrire</Button>
            </div></>);
    }

    const registerForm = () => {
        return (<>
        <h3 className="formTitle">Inscription</h3>
            <div className='loginInputContainer'>
                <FormControl variant="standard" className='loginInput'>
                    <InputLabel htmlFor="username-register">Nom d'utilisateur</InputLabel>
                    <Input
                        fullWidth
                        id="username-register"
                        type='text'
                        sx={{
                            ':before': { borderBottomColor: 'text.secondary' }
                        }}
                        endAdornment={
                            <InputAdornment position="end" sx={{pr:1, color: 'text.secondary'}}>
                                <BadgeIcon />
                            </InputAdornment>
                        }
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                />
                </FormControl>
            </div>
            <div className='loginInputContainer'>
                <FormControl variant="standard" className='loginInput'>
                    <InputLabel htmlFor="mail-register">Adresse Email</InputLabel>
                    <Input
                        fullWidth
                        id="mail-register"
                        type='mail'
                        sx={{
                            ':before': { borderBottomColor: 'text.secondary' }
                        }}
                        endAdornment={
                            <InputAdornment position="end" sx={{pr:1, color: 'text.secondary'}}>
                                <AccountCircle />
                            </InputAdornment>
                        }
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                />
                </FormControl>
            </div>
            <div className='loginInputContainer'>
                <FormControl variant="standard" className='loginInput'>
                    <InputLabel htmlFor="password-register">Mot de passe</InputLabel>
                    <Input
                        fullWidth
                        id="password-register"
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
            <div className='loginButton'>
                <Button variant="contained" onClick={handleRegister}>S'inscrire</Button>
            </div>
            <div className='loginButton'>
                <Button variant="outlined" onClick={()=>{setRegister(false);setIdInvalides(false);}} sx={{mb:2}}>Se connecter</Button>
            </div></>);
    }

    // affichage
    return(<div className="Login">
                <div className="loginContainer">
                    <div className="titleContainer">
                        <ChecklistIcon fontSize="large"/>
                        <h1 className="loginTitle">Todolist</h1>
                    </div>
                    <form className='formContainer' onSubmit={handleSubmit}>
                        { register ? registerForm() : loginForm()}
                        <div>{errorAlert}</div>
                    </form>
                </div>
            </div>);
}

export default Login;