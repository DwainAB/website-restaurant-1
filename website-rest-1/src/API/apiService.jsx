const BASE_URL = 'http://localhost:3307/back-wok-rosny/index.php/api'; 

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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodData),
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    updateFood: async (id, foodData) => {
        try {
            const response = await fetch(`${BASE_URL}/foods/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodData),
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
};
