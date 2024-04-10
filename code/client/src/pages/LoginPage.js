// import { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { LOGIN_USER } from '../gqloperations/mutations'
// import { useMutation } from '@apollo/client'
// import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import Navbar_on_loginpage from '../components/Navbar_on_loginpage.js';
// import '../pages/newauth.css';
// import emailIcon from '.././emailbox.png';
// import passwordIcon from '.././passwordlogo.png';
// const LoginPage = () => {
//   const { register, handleSubmit, reset } = useForm()
//   const [data, setData] = useState('')
//   // const [showPassword, setShowPassword] = useState(false);
  // const [emailHovered, setEmailHovered] = useState(false);
  // const [passwordHovered, setPasswordHovered] = useState(false);
//   const navigate = useNavigate()
//   const [logininUser, { error, loading, formdata }] = useMutation(LOGIN_USER, {
//     onCompleted: (formdata) => {
//       console.log(formdata.loginUser)
//       // localStorage.setItem("token",formdata.user.token)
//       // console.log(formdata.user.token);
//       localStorage.setItem('authdata', JSON.stringify(formdata.loginUser));
//       navigate('/home')
//     },
//     onError: (error) => {
//       console.log(error.message)
//       alert(error.message)
//       reset()
//     },
//   })
//   const onSubmit = (data) => {
//     if (!data.email && !data.password) {
//       alert("Please enter both Email and password");
//       reset()
//       return;
//     }
//     else if (!data.email && data.password) {
//       alert("Please enter Email");
//       reset()
//       return;
//     }
//     else if (data.email && !data.password) {
//       alert("Please enter Password");
//       reset()
//       return;
//     }
//     console.log('Form data submitted:', data)
//     setData(JSON.stringify(data))
//     logininUser({
//       variables: {
//         userInput: {
//           email: data.email,
//           password: data.password,
//         },
//       },
//     })
//   }
//   return (
//     <div>
//     <Navbar_on_loginpage />
//     <div className='body' style={{ minHeight: 'calc(100vh - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <form onSubmit={handleSubmit(onSubmit)} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px', background: 'white',width: '562px',height:'644px' ,position:'relative',top:'-5px',left:'-400px'}}>
//         <h2 className='login-heading'>Please fill out the details to get started</h2>
//         <div style={{ position: 'relative', marginBottom: '15px' }}
        //   onMouseEnter={() => setEmailHovered(true)}
        // onMouseLeave={() => setEmailHovered(false)} 
//         >
      //  <input className='emailbox'{...register('email')} placeholder="Email" type='email' style={{ width: '437px', height: '68px', padding: '10px', paddingLeft: '60px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '20px' ,position:'relative',top:'120px',left:'40px',border: emailHovered ? '2px solid #007bff' : '1px solid #ccc',
      //           boxShadow: emailHovered ? '0 0 2px 1px rgba(0, 0, 0, 0.2)' : 'none'}}
      //         />
//        <img src={emailIcon} alt="Email icon" style={{ position: 'absolute', top: '154px', left: '55px', transform: 'translateY(-50%)', height: '40px' }} />
//        </div>
//        <div style={{ position: 'relative', marginBottom: '15px' }}
//          onMouseEnter={() => setPasswordHovered(true)}
//          onMouseLeave={() => setPasswordHovered(false)}
//        >
//        <input className='passwordbox'{...register('password')} placeholder="Password" type='password' style={{ width: '437px', height: '68px', padding: '10px', paddingLeft: '60px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '20px' ,position:'relative',top:'120px',left:'40px',
//        border: passwordHovered ? '2px solid #007bff' : '1px solid #ccc',
//        boxShadow: passwordHovered ? '0 0 2px 1px rgba(0, 0, 0, 0.2)' : 'none'}} 
//        />
//        <img src={passwordIcon} alt="Password icon" style={{ position: 'absolute', top: '154px', left: '55px', transform: 'translateY(-50%)', height: '40px' }} />
//        </div>
//         <input type="submit" value="Login" style={{ fontFamily:"Poppins",fontWeight:'700',width: '138px',height:'52px', padding: '10px', borderRadius: '20px', border: 'none', background: '#5555FB', color: 'white', cursor: 'pointer',position:'relative',left:'300px',top:'130px' }} />
//           <p style={{textDecoration: 'none', color: 'blue', fontSize: '20px',position:'relative',left:'180px',top:'250px'}}>New user ?</p>
//           <Link
//             to="/signup"
//             type="button"
//           >
//         <button style={{ width: '150px', padding: '10px', borderRadius: '20px', border: 'none', background: '#5555FB', color: 'white', cursor: 'pointer',position:'relative',left:'160px',top:'260px' ,height:'40px'}}>Signup</button>
//           </Link>
//       </form>
//     </div>
//   </div>
//   )
// }

// export default LoginPage
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
import emailIcon from '.././emailbox.png';
import passwordIcon from '.././passwordlogo.png';

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [emailHovered, setEmailHovered] = useState(false);
  const [passwordHovered, setPasswordHovered] = useState(false);
  const navigate = useNavigate();

  const [loginUser, { error, loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('authdata', JSON.stringify(data.loginUser));
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
