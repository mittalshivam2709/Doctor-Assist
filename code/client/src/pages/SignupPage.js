import React from 'react'

const SignupPage = () => {
  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form className="sign-up-form">
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="username"/>

        <label htmlFor="email">Email</label>
        <input type="email" autoComplete="off" placeholder="Email"/>

        <label htmlFor="password">Password</label>
        <input type="password" placeholder='******'/>

        <button type='submti'>Sign up</button>
      </form>
    </div>
  )
}

export default SignupPage
