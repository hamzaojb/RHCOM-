import React from 'react'
import '../css/Signup.css'
import hrcomImage from '../images/hrcom.png'; 




const Signup = () => {
    const handleSignInClick = () => {
        window.location.href = '/'; // Redirige vers /login
    };
  return (
    <div className='container-login'>
        <div className='formsignup'>
        <img src={hrcomImage} className='logo' alt="Description de l'image" />
            <label> Fullname :</label>
            <input type='email' placeholder='Enter your email'></input>
            <label> Email :</label>
        
            <input type='email' placeholder='Enter your email'></input>
            <label> Date naissance :</label>
        
            <input type='date' />
            <label>Password :</label>
            <input type='password' placeholder='Enter your password '></input>
            <button   type='submit' className='buttonlogin'>login</button>
            <span onClick={handleSignInClick} style={{ cursor: 'pointer', color: 'black' }}>
                    if you have an account, signin!
                </span>

        </div>
    </div>
  )
}

export default Signup