import React, { useState } from 'react'
import '../pages/SignupPage.css'
import Axios from "axios"

const handleSubmit = (e) => {
  e.preventDefault()
  Axios.port('https://localhost:3000/auth/signup', {
    username,
    email,
    password,
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
}

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="outersignup">
      <div className="sign-up-container">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2 className="sp">Sign Up</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            autoComplete="off"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="signupbutton">
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
