import React, { useState, useEffect } from 'react'
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import './Login.css'
import FacebookLogin from 'react-facebook-login'
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
export default function Login() {
    const [userData, setUserData] = useState([])
    const [profile, setProfile] = useState([])
    const responseFacebook = (response) => {
        console.log(response);
    }
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUserData(codeResponse),
        onerror: (error) => console.log('Google signin error: ', error)
    })
    useEffect(
        () => {
            if (userData) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${userData.access_token}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        setProfile(res.data);
                        localStorage.setItem('accessToken', userData.access_token)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [userData]
    );
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    return (
        <div className='container'>
            <div className='wrapper'>
                <form action=''>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>
                    <div className='remember-forgot'>
                        <label> <input type='checkbox' />Remember me</label>
                        <a href='#'>Forgot password?</a>
                    </div>
                    <button type='submit' className='buttonLogin'>Login</button>
                    <FacebookLogin
                        appId='3532223907038486'
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        icon="fa-facebook"
                        buttonStyle={{
                            backgroundColor: '#4267b2',
                            borderRadius: '40px',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            height: 40,
                            color: '#FFF',
                            fontFamily: 'Poppins',
                            marginTop: 15,
                            justifyContent: 'center',
                            fontWeight: 500,
                            marginBottom: 15
                        }}
                        textButton='Login With Facebook'
                    />
                    <button type='submit' onClick={googleLogin} className='buttonGoogle'><FcGoogle className='icon' /> Login With Google</button>
                    <div className='register-link'>
                        <p>
                            Dont have an account? <a href='#'>Register</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
