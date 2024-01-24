import React, { useState, useEffect } from 'react';
import { apiService } from '../../API/apiService';
import './Utilisateur.css'

function Utilisateur() {
    const [users, setUsers] = useState([]);
    const [editableUsers, setEditableUsers] = useState({});
    const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '', tel: '', address: '', role: 'User' });
    const [loading, setLoading] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1120);


    

    useEffect(() => {
        console.log(editableUsers);
    }, [editableUsers]);
    


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await apiService.getAllUsers();
                setUsers(fetchedUsers);
                console.log(fetchedUsers);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateur :", error);
            }
        };

        fetchUsers();

        const handleResize = () => {
            const smallScreen = window.innerWidth <= 1120;
            setIsSmallScreen(smallScreen);
            // Mise à jour du nombre d'articles par page en fonction de la taille de l'écran
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleInputChange = (userId, event) => {
        const { name, type, value, files } = event.target;
        const newValue = type === "file" ? files[0] : value;
      
        setEditableUsers((prev) => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                [name]: newValue === '' ? "" : newValue,
            },
        }));
    };

    const handleUpdateAllUsers = async (event) => {
        event.preventDefault();
        
        let isUpdated = false;
    
        for (const userId in editableUsers) {
            const formData = new FormData();
            const userData = editableUsers[userId];
    
            for (const key in userData) {
                formData.append(key, userData[key]);
            }
    
            try {
                const response = await apiService.updateUser(userId, formData);
                if (response.success) {
                    console.log('Mise à jour réussie', response.message);
                    isUpdated = true;
                } else {
                    console.error('Erreur lors de la mise à jour', response.message);
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi à l\'API', error);
            }
        }
    
        if (isUpdated) {
            alert("Modifications ajoutées avec succès");
            const updatedUsers = await apiService.updateUser();
            setUsers(updatedUsers);
        }
    
        setEditableUsers({});
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await apiService.deleteUser(userId);
            console.log('te');
            if (response.status === 204) {
                console.log('Suppression réussie');
                const updatedUsers = await apiService.getAllUsers(); // Ajout de cette ligne pour récupérer la liste mise à jour
            setUsers(updatedUsers);
                // Effectuez les actions nécessaires après la suppression
            } else {
                console.error('Réponse inattendue lors de la suppression');
            }
        } catch (error) {
            const updatedUsers = await apiService.getAllUsers(); // Ajout de cette ligne pour récupérer la liste mise à jour
            setUsers(updatedUsers);
            console.error('Erreur lors de la suppression', error.message);
        }
    };
     
    const handleNewUserInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddNewUser = async (event) => {
        event.preventDefault();
        console.log('Envoi de newUser:', newUser);
        
        // Créer un objet FormData
        const formData = new FormData();
        for (const key in newUser) {
            formData.append(key, newUser[key]);
        }
    
        try {
            const addUserResponse = await apiService.addUser(formData); // Assurez-vous que addUser gère correctement FormData
            console.log('Réponse de l\'API:', addUserResponse);
            
            // Vérifiez si l'ajout de l'utilisateur a réussi
            if (addUserResponse.success) {
                console.log('Utilisateur ajouté avec succès', addUserResponse.message);
    
                // Réinitialiser le formulaire
                setNewUser({ firstname: '', lastname: '', email: '', tel: '', address: '', role: 'User' });
    
                // Récupérer la liste mise à jour des utilisateurs
                const fetchedUsers = await apiService.getAllUsers();
                setUsers(fetchedUsers);
            } else {
                const fetchedUsers = await apiService.getAllUsers();
                setUsers(fetchedUsers);
                console.error('Erreur lors de l\'ajout de l\'utilisateur', addUserResponse.message);
            }
        } catch (error) {
            const fetchedUsers = await apiService.getAllUsers();
            setUsers(fetchedUsers);
            console.error('Erreur lors de l\'envoi à l\'API', error);
        }
    };
    
    

    return (
        <div>
            <h2 className='title-user'>Liste des Utilisateurs</h2>
            <form onSubmit={handleUpdateAllUsers}>
                <div className="list-users">
                    {users.map((user) => (
                        <div className="user-info" key={user.id}>
                            <input
                                className='user-info-firstname'
                                type="text"
                                name="firstname"
                                placeholder="Prénom"
                                value={editableUsers[user.id]?.firstname ?? user.firstname}
                                onChange={(e) => handleInputChange(user.id, e)}
                            />
                            <input
                                className='user-info-lastname'
                                type="text"
                                name="lastname"
                                placeholder="Nom"
                                value={editableUsers[user.id]?.lastname ?? user.lastname}
                                onChange={(e) => handleInputChange(user.id, e)}
                            />
                            <input
                                className='user-info-email'
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={editableUsers[user.id]?.email ?? user.email}
                                onChange={(e) => handleInputChange(user.id, e)}
                            />
                            <input
                                className='user-info-tel'
                                type="text"
                                name="tel"
                                placeholder="Téléphone"
                                value={editableUsers[user.id]?.tel ?? user.tel}
                                onChange={(e) => handleInputChange(user.id, e)}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Adresse"
                                value={editableUsers[user.id]?.address ?? user.address}
                                onChange={(e) => handleInputChange(user.id, e)}
                            />
                            <select
                                className='user-info-role'
                                name="role"
                                value={editableUsers[user.id]?.role ?? user.role}
                                onChange={(e) => handleInputChange(user.id, e)}
                            >
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                            <button type="button" onClick={() => handleDeleteUser(user.id)}>{isSmallScreen ? 'Supprimer' : 'X'}</button>
                        </div>
                    ))}
                </div>
                <div className='container-btn-update-user'><button className='btn-update-user' type="submit">Mettre à jour</button></div>
            </form>

            <div>
                <h2 className='title-user'>Ajouter un nouvel utilisateur</h2>
                <div className='container-form-add-user'>
                    <form onSubmit={handleAddNewUser}>
                        <div className="container-add-user-section-top">
                            <input
                                className='input-add-user-firstname'
                                type="text"
                                name="firstname"
                                placeholder="Prénom"
                                value={newUser.firstname}
                                onChange={handleNewUserInputChange}
                            />
                            <input
                                className='input-add-user-lastname'
                                type="text"
                                name="lastname"
                                placeholder="Nom"
                                value={newUser.lastname}
                                onChange={handleNewUserInputChange}
                            />
                            <input
                                className='input-add-user-email'
                                type="email"
                                name="email"
                                placeholder="Mail"
                                value={newUser.email}
                                onChange={handleNewUserInputChange}
                            />
                            <input
                                className='input-add-user-password'
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                value={newUser.password}
                                onChange={handleNewUserInputChange}
                            />
                        </div>

                        <div className="container-add-user-section-bottom">
                            <input
                                className='input-add-user-tel'
                                type="text"
                                name="tel"
                                placeholder="Téléphone"
                                value={newUser.tel}
                                onChange={handleNewUserInputChange}
                            />
                            <input
                                className='input-add-user-address'
                                type="text"
                                name="address"
                                placeholder="Adresse"
                                value={newUser.address}
                                onChange={handleNewUserInputChange}
                            />
                            <select
                                className='input-add-user-role'
                                name="role"
                                value={newUser.role}
                                onChange={handleNewUserInputChange}
                            >
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                            <button type="submit">Ajouter</button>
                        </div>

                       
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Utilisateur;
