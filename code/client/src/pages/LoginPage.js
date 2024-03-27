import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LOGIN_USER } from '../gqloperations/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import '../loginpage.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState('')
  const [showPassword, setShowPassword] = useState(false);
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
    if (!data.username && !data.password) {
      alert("Please enter both username and password");
      reset()
      return;
    }
    else if (!data.username && data.password) {
      alert("Please enter Username");
      reset()
      return;
    }
    else if (data.username && !data.password) {
      alert("Please enter Password");
      reset()
      return;
    }
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
          <div className="password-input">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'} // Toggle type between text and password
              placeholder="Password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye} // Use FontAwesome icon based on showPassword state
              onClick={togglePasswordVisibility}
              style={{position:'relative',top:'-59px',left:'370px'}}
            />
          </div>
          <br />
          <Link to="/forgotpassword"
            style={{ textDecoration: 'none', color: 'blue', fontSize: '20px',position:'relative',top:'-25px',left:'250px'}}
            >Forgot password ?</Link>
          <input type="submit" value="Login"/>

          <p style={{textDecoration: 'none', color: 'blue', fontSize: '20px',position:'relative',left:'160px',top:'-10px'}}>New user ?</p>
          <Link
            to="/signup"
            type="button"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            style={{
              background: '#65a5e9',
              color: 'white',
              backgroundSize: '40px',
              fontSize: '23px',
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
