import React, { useState } from 'react';
import '../css/Signup.css';
import hrcomImage from '../images/workifyre.png'; 
import axios from 'axios';

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // État pour le message de succès ou d'erreur

    const handleSignInClick = () => {
        window.location.href = '/'; // Redirige vers /login
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        try {
            const response = await axios.post('http://localhost:5000/signup', {
                fullname,
                email,
                birthdate,
                password,
            });
            console.log('Inscription réussie:', response.data);
            setMessage('Inscription réussie !'); // Message de succès

            // Vider les champs du formulaire
            setFullname('');
            setEmail('');
            setBirthdate('');
            setPassword('');
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error.response ? error.response.data : error.message);
            setMessage('Erreur lors de l\'inscription : ' + (error.response ? error.response.data.error : error.message)); // Message d'erreur
        }
    };

    return (
        <div className='container-login'>
            <div className='formsignup'>
                <img src={hrcomImage} className='logo' alt="Description de l'image" />
                <form onSubmit={handleSubmit}>
                    <label> Fullname :</label>
                    <input 
                        type='text' 
                        placeholder='Enter your fullname' 
                        value={fullname} 
                        onChange={(e) => setFullname(e.target.value)} 
                    />
                    <label> Email :</label>
                    <input 
                        type='email' 
                        placeholder='Enter your email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label> Date de naissance :</label>
                    <input 
                        type='date' 
                        value={birthdate} 
                        onChange={(e) => setBirthdate(e.target.value)} 
                    />
                    <label>Password :</label>
                    <input 
                        type='password' 
                        placeholder='Enter your password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type='submit' className='buttonlogin'>Sign Up</button>
                </form>
                {message && <p className='message'>{message}</p>} {/* Affiche le message */}
                <span onClick={handleSignInClick} style={{ cursor: 'pointer', color: 'black' }}>
                    If you have an account, sign in!
                </span>
            </div>
        </div>
    );
};

export default Signup;
