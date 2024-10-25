import React, { useState } from 'react';
import '../css/Login.css';
import hrcomImage from '../images/workifyre.png'; // Ajuste le chemin si nécessaire
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignupClick = () => {
        window.location.href = '/signup'; // Redirige vers /signup
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        try {
            const response = await axios.post('http://localhost:5000/signin', {
                email,
                password,
            });
            console.log('Connexion réussie:', response.data);
            setMessage('Connexion réussie !'); // Message de succès
            setTimeout(() => {
              window.location.href = '/home'; // Redirection vers /home après un court délai
          }, 1000);
            // Vous pouvez ici rediriger l'utilisateur vers une autre page ou stocker le token
            // Par exemple, redirection vers un tableau de bord
            // window.location.href = '/dashboard'; 
        } catch (error) {
            console.error('Erreur lors de la connexion:', error.response ? error.response.data : error.message);
            setMessage('Erreur lors de la connexion : ' + (error.response ? error.response.data.error : error.message)); // Message d'erreur
        }
    };

    return (
        <div className='container-login'>
            <div className='formlogin'>
                <img src={hrcomImage} className='logo' alt="Description de l'image" />
                <form onSubmit={handleLoginSubmit}>
                    <label>Email :</label>
                    <input 
                        type='email' 
                        placeholder='Enter your email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label>Password :</label>
                    <input 
                        type='password' 
                        placeholder='Enter your password ' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type='submit' className='buttonlogin'>Login</button>
                </form>
                {message && <p>{message}</p>} {/* Affiche le message de connexion */}
                <span onClick={handleSignupClick} style={{ cursor: 'pointer', color: 'black' }}>
                    If you don't have an account, signup!
                </span>
            </div>
        </div>
    );
}

export default Login;
