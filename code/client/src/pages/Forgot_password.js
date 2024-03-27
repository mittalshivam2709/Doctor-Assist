import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RESET_PASSWORD } from '../gqloperations/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import '../loginpage.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Forgot_password = () => {
  const { register, handleSubmit, reset, watch, setError, clearErrors } =
    useForm()
  const [data, setData] = useState('')
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate()
  const newpassword = watch('newpassword')
  const renewpassword = watch('renewpassword')

  const [passwordrst, { error, loading, formdata }] = useMutation(
    RESET_PASSWORD,
    {
      onCompleted: (formdata) => {
        console.log(formdata.loginUser)
        // localStorage.setItem("token",formdata.user.token)
        // console.log(formdata.user.token);
        navigate('/')
      },
      onError: (error) => {
        alert(error.message)
        reset()
      },
    }
  )
  const onSubmit = (data) => {
    // console.log('Form data submitted:', data)
    if (newpassword !== renewpassword) {
      alert('Passwords do not match')
      setError('renewpassword', {
        type: 'manual',
        message: 'Passwords do not match',
      })
      return
    }
    clearErrors('renewpassword')
    // console.log('', data)
    setData(JSON.stringify(data))
    passwordrst({
      variables: {
        userInput: {
          username: data.username,
          password: data.newpassword,
        },
      },
    })
  }
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
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
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email')}
            type='email' 
            placeholder="Enter email"
          />
          <br />
          <input type="submit" value="Submit" />
          <Link
            to="/"
            type="button"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            style={{
              background: '#65a5e9',
              color: 'white',
              backgroundSize: '40px',
              fontSize: '23px',
            }}
          >
            Back
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Forgot_password
