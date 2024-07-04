import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Regitster';
import ForgetPassword from './components/Forgetpass';
import Resetpass from './components/Resetpass';
import Home from './components/Home';
// import ProtectedPage from './components/ProtectedPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/fpass" element={<ForgetPassword />} />
                <Route path="/rpass" element={<Resetpass />} />
                {/* <Route path="/protected" element={<ProtectedPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;