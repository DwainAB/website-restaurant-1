import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/FirebaseConfig';
import 'firebase/auth';
import Order from '../Order/Order';
import Reservation from '../Reservation/Reservation';

const ProtectedPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!user) {
    // Rediriger vers la page de connexion ou afficher un message d'erreur
    return <div>Vous devez être connecté pour accéder à cette page.</div>;
  }

  // Afficher le contenu de la page protégée
  return <div>
    <Order/>
    <Reservation/>
    </div>;
};

export default ProtectedPage;
