import React from 'react'
import '../css/Login.css'
import hrcomImage from '../images/hrcom.png'; // Ajuste le chemin si nécessaire


const Login = () => {
    
        const handleSignupClick = () => {
            window.location.href = '/signup'; // Redirige vers /login
        };
  return (
    <div className='container-login'>
        <div className='formlogin'>
        <img src={hrcomImage} className='logo' alt="Description de l'image" />
        
            <label> Email :</label>
            <input type='email' placeholder='Enter your email'></input>
            <label>Password :</label>
            <input type='password' placeholder='Enter your password '></input>
            <button   type='submit' className='buttonlogin'>login</button>
            <span onClick={handleSignupClick} style={{ cursor: 'pointer', color: 'black' }}>
                    if you dont have an account, signup!
                </span>

        </div>
    </div>
  )
}

export default Login