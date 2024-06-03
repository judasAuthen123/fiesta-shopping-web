import React, { useState } from 'react'
import { FaUser, FaLock } from "react-icons/fa";
import './Register.css'
export default function Register() {
  const [gender, setGender] = useState(null)
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    console.log(gender);
  };
  return (
    <div className='container'>
      <div className='wrapper'>
        <form action=''>
          <h1>Register</h1>
          <div className='input-box'>
            <input type='text' placeholder='Username' required />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' required />
            <FaLock className='icon' />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Confirm password' required />
            <FaLock className='icon' />
          </div>
          <div className='gender-box'>
            <h4>Gender</h4>
            <div className='radio-group-gender'>
              <label>Male</label><input type="radio" name="gender" value="male" onChange={handleGenderChange}></input>
              <label>Female</label><input type="radio" name="gender" value="female" onChange={handleGenderChange}></input>
            </div>
          </div>
          <button type='submit' className='buttonLogin'>Register Account</button>
        </form>
      </div>
    </div>
  )
}
