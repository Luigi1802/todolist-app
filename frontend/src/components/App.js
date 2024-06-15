import React from 'react';
import todolistTheme from '../todolistTheme.js';
import { ThemeProvider } from '@mui/material/styles';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home.js';
import Login from '../pages/Login.js';
import AuthGuard from '../components/AuthGuard.js';

const App = () => {
  return (
    <ThemeProvider theme={todolistTheme}>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}/> 
            <Route path="/*" element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }/>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
