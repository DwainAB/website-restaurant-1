import React, { useState } from 'react';
import { app } from '../Firebase/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';
import { auth } from '../Firebase/FirebaseConfig';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Connexion réussie
        const user = userCredential.user;
        console.log('Utilisateur connecté :', user);
        window.location.href = '/protectedPage';
      })
      .catch((error) => {
        // Erreur de connexion
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erreur de connexion :', errorCode, errorMessage);
      });
  };

  const user = auth.currentUser;


  return (
    <>
      {!user ? (
        <div className="container-login" style={{ display: props.show ? 'block' : 'none' }}>
          <h2>Connexion</h2>
          <div className="login-input">
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Se connecter</button>
          </div>
        </div>
      ) : null}
          </>
  );
};

export default Login;
