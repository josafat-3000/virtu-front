import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/Login/Login'; // Asegúrate de que la ruta sea correcta
import RegisterForm from './pages/Register/Register'; // Asegúrate de que la ruta sea correcta
import './App.css'; // Archivo de estilos globales, si tienes uno
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from "./components/Protected";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute redirectAuthenticatedTo="/">
              <LoginForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute redirectAuthenticatedTo="/">
              <RegisterForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
