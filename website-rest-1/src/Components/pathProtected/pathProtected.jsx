import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
    const isAuthenticated = localStorage.getItem('token') !== null; // Ou votre logique pour déterminer si l'utilisateur est connecté
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role; // Assurez-vous que le rôle est stocké dans localStorage lors de la connexion

    if (!isAuthenticated || (roleRequired && userRole !== roleRequired)) {
        // Si l'utilisateur n'est pas authentifié ou n'a pas le bon rôle, redirigez vers la page de connexion
        return <Navigate to="/" />;
    }

    return children; // Rendre les enfants si tout est bon
};

export default ProtectedRoute