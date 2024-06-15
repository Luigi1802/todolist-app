// Composant de la barre de navigation
import React from 'react';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PersonIcon from '@mui/icons-material/Person';
import '../styles/Navbar.css';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useNavigate } from "react-router-dom";
import { authService } from '../services/authService';

const Navbar = () => {
    // variables
    const userName = authService.getUsername();
    const navigate = useNavigate();

    // fonctions
    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    }

    // affichage
    return (
        <div className="Navbar">
            <div className="navbarSplit">
                <div className="navBarTitle">
                    <ChecklistIcon className="navbarIcon" fontSize="large"/>
                    <h3>Todolist</h3>
                </div>
            </div>
            <div className="navbarSplit">
                <div className="navBarUser">
                    <PersonIcon className="navbarIcon" fontSize="large"/>
                    <h3>{userName}</h3>
                </div>
                <div className="navBarDivider"><p></p></div>
                <div className="navBarLogout">
                    <MeetingRoomIcon
                        className="navbarIcon"
                        sx={{fontSize: 35, cursor: 'pointer',  mt:'15%'}}
                        onClick={handleLogout}/>
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;