import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import '../loginpage.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Forgot_reset_password = () => {
  const { register, handleSubmit, reset, watch, setError, clearErrors } =
    useForm()
  const [data, setData] = useState('')
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const onSubmit = (data) => {
    if (!data.username && !data.newpassword) {
      alert("Please enter both Username and new Password");
      reset()
      return;
    }
    else if (!data.username && data.newpassword) {
      alert("Please enter Username");
      reset()
      return;
    }
    else if (data.username && !data.newpassword) {
      alert("Please enter New Password");
      reset()
      return;
    }
    else if((data.username && data.newpassword && !data.renewpassword))
    {
      alert("Please enter renew password also");
      return;
    }
    if (data.newpassword !== data.renewpassword) {
      alert('New and Renew Passwords do not match')
      return
    }
    // console.log('', data)
    setData(JSON.stringify(data))
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
          Reset Password after Forgetting the real one...
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('username')} placeholder="Username" />
          <br />
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

export default Forgot_reset_password
