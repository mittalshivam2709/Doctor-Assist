import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RESET_PASSWORD } from '../gqloperations/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import '../loginpage.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Password_Reset = () => {
  const { register, handleSubmit, reset, watch, setError, clearErrors } =
    useForm()
  const [data, setData] = useState('')
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
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
        alert("Password updated successfully")
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
    if (!data.username && !data.oldpassword) {
      alert("Please enter both Username and Old Password");
      reset()
      return;
    }
    else if (!data.username && data.oldpassword) {
      alert("Please enter Username");
      reset()
      return;
    }
    else if (data.username && !data.oldpassword) {
      alert("Please enter Password");
      reset()
      return;
    }
    else if((data.username && data.oldpassword && !data.newpassword))
    {
      alert("Please enter new password also");
      return;
    }
    else if((data.username && data.oldpassword && data.newpassword && !renewpassword))
    {
      alert("Please enter renew password also");
      return;
    }
    else if (newpassword !== renewpassword) {
      alert('New and Renew passwords do not match')
      // setError('renewpassword', {
      //   type: 'manual',
      //   message: 'Passwords do not match',
      // })
      return
    }
    // clearErrors('renewpassword')
    // console.log('', data)
    setData(JSON.stringify(data))
    passwordrst({
      variables: {
        userInput: {
          username: data.username,
          password: data.newpassword,
          doctor_name: data.oldpassword,
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
  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
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
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('username')} placeholder="Username" />
          <br />
          <input
            {...register('oldpassword')}
            type={showPassword3 ? 'text' : 'password'} 
            placeholder="Enter old password"
          />
           <FontAwesomeIcon
              icon={showPassword3 ? faEyeSlash : faEye} // Use FontAwesome icon based on showPassword state
              onClick={togglePasswordVisibility3}
              style={{position:'relative',top:'-55px',left:'170px'}}
            />
          <input
            {...register('newpassword')}
            type={showPassword1 ? 'text' : 'password'} 
            placeholder="Enter new password"
          />
           <FontAwesomeIcon
              icon={showPassword1 ? faEyeSlash : faEye} // Use FontAwesome icon based on showPassword state
              onClick={togglePasswordVisibility1}
              style={{position:'relative',top:'-55px',left:'170px'}}
            />
          <input
            {...register('renewpassword')}
            type={showPassword2 ? 'text' : 'password'} 
            placeholder="Re-enter new password"
          />
           <FontAwesomeIcon
              icon={showPassword2 ? faEyeSlash : faEye} // Use FontAwesome icon based on showPassword state
              onClick={togglePasswordVisibility2}
              style={{position:'relative',top:'-55px',left:'170px'}}
            />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default Password_Reset
