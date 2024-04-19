import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LOGIN_USER } from '../gqloperations/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar_on_loginpage from '../components/Navbar_on_loginpage.js';
import '../pages/newauth.css';
import emailIcon from '.././emailbox.png';
import passwordIcon from '.././passwordlogo.png';
import { ChatState } from '../context/ChatProvider.js'
import { FETCH_USER_ID_BY_EMAIL } from '../gqloperations/queries.js'

const useAuthUser = (loginEmail) => {
  const { loading: authLoading, error: authError, data: authData } = useQuery(FETCH_USER_ID_BY_EMAIL, {
    variables: { loginEmail },
  });
  console.log("authDAta ->", authData); 
  return { authLoading, authError, authData };
};



const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [emailHovered, setEmailHovered] = useState(false);
  const [passwordHovered, setPasswordHovered] = useState(false);
  const [loginEmail, setLoginEmail] = useState(null);
  const navigate = useNavigate();
  const {user, setUser} = ChatState()

  
  const [loginUser, { error, loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('authdata', JSON.stringify(data.loginUser));
      // const authdata = JSON.parse(localStorage.getItem('authdata'));
      // setUser(authdata ? authdata.id : '65d463dda0b915283dced3dd');
      setLoginEmail(data.loginUser.email);
      navigate('/home');
    },
    onError: (error) => {
      alert(error.message);
      reset();
    },
  });

  const onSubmit = (data) => {
    if (!data.email && !data.password) {
      alert("Please enter both Email and password");
      reset();
      return;
    } else if (!data.email && data.password) {
      alert("Please enter Email");
      reset();
      return;
    } else if (data.email && !data.password) {
      alert("Please enter Password");
      reset();
      return;
    }
    console.log('Form data submitted:', data);
    loginUser({
      variables: {
        userInput: {
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <div>
      <Navbar_on_loginpage />
      <div className='body'>
        <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
          <h2 className='login-heading'>Please fill out the details to get started</h2>
          <div className='input-container' 
          onMouseEnter={() => setEmailHovered(true)}
          onMouseLeave={() => setEmailHovered(false)} >
            <input
              {...register('email')}
              // placeholder="Email"
              type='email'
              className='input-field emailbox'
              style={{
                border: 
                  (emailHovered && !document.activeElement.classList.contains('emailbox')) ? '2px solid #007bff' : '1px solid #ccc',
                boxShadow: 
                  (emailHovered && !document.activeElement.classList.contains('emailbox')) ? '0 0 2px 1px rgba(0, 0, 0, 0.2)' : 'none'
              }}
            />
            <div className='email-logo' >Email</div>
            <img src={emailIcon} alt="Email icon" className='input-icon' />
          </div>
          <div className='input-container'
            onMouseEnter={() => setPasswordHovered(true)}
            onMouseLeave={() => setPasswordHovered(false)}
          >
            <input
              {...register('password')}
              // placeholder="Password"
              type='password'
              className='input-field passwordbox'
              style={{border: passwordHovered ? '2px solid #007bff' : '1px solid #ccc',
              boxShadow: passwordHovered ? '0 0 2px 1px rgba(0, 0, 0, 0.2)' : 'none'}}
            />
            <div className='email-logo' >Password</div>
            <img src={passwordIcon} alt="Password icon" className='input-icon' />
          </div>
          <input type="submit" value="Login" className='submit-btn' />
          <p className='signup-link'>New user ? <Link to="/signup">Signup</Link></p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
