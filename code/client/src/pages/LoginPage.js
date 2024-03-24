import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LOGIN_USER } from '../gqloperations/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import '../loginpage.css'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState('')
  const navigate = useNavigate()
  const [logininUser, { error, loading, formdata }] = useMutation(LOGIN_USER, {
    onCompleted: (formdata) => {
      console.log(formdata.loginUser)
      // localStorage.setItem("token",formdata.user.token)
      // console.log(formdata.user.token);
      navigate('/home')
    },
    onError: (error) => {
      console.log(error.message)
      alert(error.message)
      reset()
    },
  })
  const onSubmit = (data) => {
    console.log('Form data submitted:', data)
    setData(JSON.stringify(data))
    logininUser({
      variables: {
        userInput: {
          username: data.username,
          password: data.password,
        },
      },
    })
  }
  // useEffect(() => {
  //   if (error) {
  //     alert(error.message);
  //   }
  // }, [error]);
  return (
    <div className="outerlogin">
      <div className="login-container">
        <h2
          style={{
            color: 'blue',
            position: 'relative',
            top: '-20px',
            fontSize: '30px',
          }}
        >
          Login Page
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('username')} placeholder="Username" />
          <br />
          <input
            {...register('password')}
            type="password"
            handleSubmit
            placeholder="Password"
          />
          <br />
          <Link to="/passwordreset">Forgot password ?</Link>
          <input type="submit" value="Login" />

          <p>New user ?</p>
          <Link
            to="/signup"
            type="button"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            style={{
              background: '#007bff',
              color: 'white',
              backgroundSize: '40px',
              fontSize: '20px',
              textAlign: 'center',
            }}
          >
            Signup
          </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
