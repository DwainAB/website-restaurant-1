const BASE_URL = 'http://localhost/back-website-restaurant-1/api'; 

export const apiService = {

    getFoods: async () => {
        try {
            const response = await fetch(`${BASE_URL}/foods`);
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    addFood: async (foodData) => {
        try {
            const response = await fetch(`${BASE_URL}/foods/add`, {
                method: 'POST',
                // Ne définissez pas l'en-tête 'Content-Type' lorsque vous envoyez un FormData.
                // 'Content-Type': 'multipart/form-data' sera automatiquement défini par le navigateur.
                body: foodData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    

    updateFood: async (id, foodData) => {
        try {
            const response = await fetch(`${BASE_URL}/foods/update/${id}`, {
                method: 'POST', // Si vous changez cela en PUT, assurez-vous que votre serveur le supporte
                body: foodData, // foodData devrait être un objet FormData
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    deleteFood: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/foods/delete/${id}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    addClientAndOrder: async (clientData) => {
        try {
            const response = await fetch(`${BASE_URL}/foods/addClientAndOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    getAllOrdersAndClients: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/foods/orders`, {
                method: 'GET',
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    deleteClient: async (clientId) => {
        try {
            const response = await fetch(`${BASE_URL}/foods/deleteClient/${clientId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

};
