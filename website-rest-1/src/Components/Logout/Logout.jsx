import { auth } from '../Firebase/FirebaseConfig';


export const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Déconnexion réussie
        console.log("Déconnexion réussie");
        window.location.href = '/';
        // Effectuez les actions nécessaires après la déconnexion, par exemple rediriger l'utilisateur vers une autre page.
      })
      .catch((error) => {
        // Une erreur s'est produite lors de la déconnexion
        console.error("Erreur lors de la déconnexion :", error);
      });
  };
  