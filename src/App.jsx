import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/Login'; // Asegúrate de que la ruta sea correcta
import RegisterForm from './pages/Register'; // Asegúrate de que la ruta sea correcta
import './App.css'; // Archivo de estilos globales, si tienes uno
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Dashboard />}>

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
