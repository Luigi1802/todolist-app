import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home.js';
import Login from '../pages/Login.js';
import AuthGuard from '../components/AuthGuard.js';

const App = () => {
  return (
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
  );
};

export default App;
