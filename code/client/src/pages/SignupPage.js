import React from 'react'
import '../pages/SignupPage.css'
const SignupPage = () => {
  return (
    <div className='outersignup'>
    <div className="sign-up-container">
      <form className="sign-up-form">
        <h2 className='sp'>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder="Username"/>

        <label htmlFor="email">Email:</label>
        <input type="email" autoComplete="off" placeholder="Email"/>

        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='******'/>

        <button type='submit' className='signupbutton'>Sign up</button>
      </form>
    </div>
    </div>
  )
}

export default SignupPage
