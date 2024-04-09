import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LOGIN_USER } from '../gqloperations/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Navbar_on_loginpage from '../components/Navbar_on_loginpage.js';
import '../pages/newauth.css';

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
    if (!data.email && !data.password) {
      alert("Please enter both Email and password");
      reset()
      return;
    }
    else if (!data.email && data.password) {
      alert("Please enter Email");
      reset()
      return;
    }
    else if (data.email && !data.password) {
      alert("Please enter Password");
      reset()
      return;
    }
    console.log('Form data submitted:', data)
    setData(JSON.stringify(data))
    logininUser({
      variables: {
        userInput: {
          email: data.email,
          password: data.password,
        },
      },
    })
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
    <Navbar_on_loginpage />
    <div style={{ background: 'linear-gradient(109.19deg, #F4F4FF 0%, #C8C8FE 100%)', minHeight: 'calc(100vh - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', background: 'white',width: '500px' }}>
        <h2 className='login-heading'>Please fill out the details to get started</h2>
        <input {...register('email')} placeholder="Email" type='email' style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <div>
          <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Password" style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <Link to="/forgotpassword"
            style={{ textDecoration: 'none', color: 'blue', fontSize: '20px',position:'relative',top:'-52px',left:'350px'}}
            > | Forgot</Link>
            </div>
        <input type="submit" value="Login" style={{ width: '150px', padding: '10px', borderRadius: '20px', border: 'none', background: '#5555FB', color: 'white', cursor: 'pointer',position:'relative',left:'300px',top:'-20px' }} />
          <p style={{textDecoration: 'none', color: 'blue', fontSize: '20px',position:'relative',left:'180px',top:'-10px'}}>New user ?</p>
          <Link
            to="/signup"
            type="button"
          >
        <button style={{ width: '150px', padding: '10px', borderRadius: '20px', border: 'none', background: '#5555FB', color: 'white', cursor: 'pointer',position:'relative',left:'160px',top:'-5px' ,height:'40px'}}>Signup</button>
          </Link>
      </form>
    </div>
  </div>
  )
}

export default LoginPage
