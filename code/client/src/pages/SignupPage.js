import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SIGNUP_USER } from '../gqloperations/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import '../pages/SignupPage.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignupPage = () => {
  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [signupUser, { error, loading, formdata }] = useMutation(SIGNUP_USER, {
    onCompleted: (formdata) => {
      // localStorage.setItem("token",formdata.user.token)
      navigate('/home')
    },
    onError: (error) => {
      alert(error.message)
      reset()
    },
  })
  const onSubmit = (data) => {
    if (!data.username && !data.password) {
      alert("Please enter both Username and Password");
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
    else if(((data.username && data.password))&&((!data.doctor_name||!data.doctor_degree||!data.doctor_mobile||!data.doctor_visit)))
    {
      alert("Please enter complete Doctor Details");
      return;
    }
    console.log('Form data submitted:', data)
    setData(JSON.stringify(data))
    signupUser({
      variables: {
        userInput: {
          username: data.username,
          password: data.password,
          doctor_name: data.doctor_name,
          doctor_degree: data.doctor_degree,
          doctor_mobile: data.doctor_mobile,
          doctor_visit: data.doctor_visit,
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
          Signup Page
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('username')} placeholder="Username" />
          <br />
          <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              style={{position:'relative',top:'-55px',left:'170px'}}
            />
          <br />
          <input {...register('doctor_name')} placeholder="Doctor's Name" />
          <br />
          <input {...register('doctor_degree')} placeholder="Doctor's Degree" />
          <br />
          <input {...register('doctor_mobile')} placeholder="Doctor's Mobile" />
          <br />
          <input {...register('doctor_visit')} placeholder="Doctor's visit" />
          <br />
          <input type="submit" value="Signup" />
          <p style={{textDecoration: 'none', color: 'blue', fontSize: '20px',position:'relative',left:'70px',top:'-10px'}}>Already have an account?</p>
          <Link
            to="/"
            type="button"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            style={{
              background: '#65a5e9',
              color: 'white',
              backgroundSize: '40px',
              fontSize: '20px',
              textAlign: 'center',
            }}
          >
            <span style={{position:'relative',top:'6px'}}>Login</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
