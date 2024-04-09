// import { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { SIGNUP_USER } from '../gqloperations/mutations'
// import { useMutation } from '@apollo/client'
// import { useNavigate } from 'react-router-dom'
// import '../pages/SignupPage.css'
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// const SignupPage = () => {
//   const { register, handleSubmit, reset } = useForm()
//   const [data, setData] = useState('')
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate()
//   const [signupUser, { error, loading, formdata }] = useMutation(SIGNUP_USER, {
//     onCompleted: (formdata) => {
//       // localStorage.setItem("token",formdata.user.token)
//       navigate('/home')
//     },
//     onError: (error) => {
//       alert(error.message)
//       reset()
//     },
//   })
//   const onSubmit = (data) => {
//     if (!data.username && !data.password) {
//       alert("Please enter both Email and Password");
//       reset()
//       return;
//     }
//     else if (!data.username && data.password) {
//       alert("Please enter Email");
//       reset()
//       return;
//     }
//     else if (data.username && !data.password) {
//       alert("Please enter Password");
//       reset()
//       return;
//     }
//     else if(((data.username && data.password))&&((!data.doctor_name||!data.doctor_degree||!data.doctor_mobile||!data.doctor_visit)))
//     {
//       alert("Please enter complete Doctor Details");
//       return;
//     }
//     console.log('Form data submitted:', data)
//     setData(JSON.stringify(data))
//     signupUser({
//       variables: {
//         userInput: {
//           username: data.username,
//           password: data.password,
//           doctor_name: data.doctor_name,
//           doctor_degree: data.doctor_degree,
//           doctor_mobile: data.doctor_mobile,
//           doctor_visit: data.doctor_visit,
//         },
//       },
//     })
//   }
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   return (
//     <div className="outerlogin">
//       <div className="login-container">
//         <h2
//           style={{
//             color: 'blue',
//             position: 'relative',
//             top: '-20px',
//             fontSize: '30px',
//           }}
//         >
//           Signup Page
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input {...register('username')} placeholder="Email" />
//           <br />
//           <input
//               {...register('password')}
//               type={showPassword ? 'text' : 'password'} 
//               placeholder="Password"
//             />
//             <FontAwesomeIcon
//               icon={showPassword ? faEyeSlash : faEye}
//               onClick={togglePasswordVisibility}
//               style={{position:'relative',top:'-55px',left:'170px'}}
//             />
//           <br />
//           <input {...register('doctor_name')} placeholder="Doctor's Name" />
//           <br />
//           <input {...register('doctor_degree')} placeholder="Doctor's Degree" />
//           <br />
//           <input {...register('doctor_mobile')} placeholder="Doctor's Mobile" />
//           <br />
//           <input {...register('doctor_visit')} placeholder="Doctor's visit" />
//           <br />
//           <input type="submit" value="Signup" />
//           <p style={{textDecoration: 'none', color: 'blue', fontSize: '20px',position:'relative',left:'70px',top:'-10px'}}>Already have an account?</p>
//           <Link
//             to="/"
//             type="button"
//             className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
//             style={{
//               background: '#65a5e9',
//               color: 'white',
//               backgroundSize: '40px',
//               fontSize: '20px',
//               textAlign: 'center',
//             }}
//           >
//             <span style={{position:'relative',top:'6px'}}>Login</span>
//           </Link>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default SignupPage

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SIGNUP_USER } from '../gqloperations/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Navbar_on_loginpage from '../components/Navbar_on_loginpage.js';
import '../pages/newauth.css';

const SignupPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [signupUser, { error, loading, formdata }] = useMutation(SIGNUP_USER, {
    onCompleted: (formdata) => {
      const email = formdata.addUser.email
      console.log("hello",formdata.addUser)
      localStorage.setItem('authdata', JSON.stringify(formdata.addUser));
      navigate('/home');
    },
    onError: (error) => {
      alert(error.message);
      reset();
    },
  });

  const onSubmit = (data) => {
    if (!data.email || !data.password || !data.doctor_name || !data.doctor_degree || !data.doctor_mobile || !data.doctor_visit|| !data.privilege) {
      alert("Please fill in all fields");
      return;
    }
    // localStorage.setItem('authdata', JSON.stringify(data));
    console.log('Form data submitted:', data);
    setData(JSON.stringify(data));
    signupUser({
      variables: {
        userInput: {
          email: data.email,
          password: data.password,
          doctor_name: data.doctor_name,
          doctor_degree: data.doctor_degree,
          doctor_mobile: data.doctor_mobile,
          doctor_visit: data.doctor_visit,
          privilege : data.privilege
        },
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // <div className="outerlogin">
    //   <div className="login-container">
    //     <h2 style={{ color: 'blue', fontSize: '30px', marginBottom: '20px' }}>Signup Page</h2>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <input {...register('username')} placeholder="Email" style={{ marginBottom: '15px' }} />
    //       <div style={{ position: 'relative' }}>
    //         <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Password" style={{ marginBottom: '15px' }} />
    //         <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} />
    //       </div>
    //       <input {...register('doctor_name')} placeholder="Doctor's Name" style={{ marginBottom: '15px' }} />
    //       <input {...register('doctor_degree')} placeholder="Doctor's Degree" style={{ marginBottom: '15px' }} />
    //       <input {...register('doctor_mobile')} placeholder="Doctor's Mobile" style={{ marginBottom: '15px' }} />
    //       <input {...register('doctor_visit')} placeholder="Doctor's visit" style={{ marginBottom: '15px' }} />
    //       <input type="submit" value="Signup" style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#65a5e9', color: 'white', cursor: 'pointer' }} />
    //       <p style={{ textAlign: 'center', marginTop: '15px', color: 'blue', fontSize: '20px' }}>Already have an account?</p>
    //       <Link to="/" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: '#65a5e9', color: 'white', borderRadius: '5px', padding: '10px', marginTop: '10px' }}>Login</Link>
    //     </form>
    //   </div>
    // </div>
    <div>
  <Navbar_on_loginpage />
  <div style={{ background: 'linear-gradient(109.19deg, #F4F4FF 0%, #C8C8FE 100%)', minHeight: 'calc(100vh - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <form onSubmit={handleSubmit(onSubmit)} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', background: 'white',width: '500px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'blue', fontSize: '30px' }}>Signup Page</h2>
      <input {...register('email')} placeholder="Email" type='email' style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      <div style={{ position: 'relative' }}>
        <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Password" style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} style={{ position: 'relative', left: '420px', top: '-40px', transform: 'translateY(-50%)', cursor: 'pointer' }} />
      </div>
      <input {...register('privilege')} placeholder="Doctor(0) or Admin(1)" style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      <input {...register('doctor_name')} placeholder="Doctor's or Admin Name" style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      <input {...register('doctor_degree')} placeholder="Doctor's or Admin Degree" style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      <input {...register('doctor_mobile')} placeholder="Doctor's or Admin Mobile" style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      <input {...register('doctor_visit')} placeholder="Doctor's or Admin visit" style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      <input type="submit" value="Signup" style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none', background: '#5555FB', color: 'white', cursor: 'pointer' }} />
      <p style={{ textAlign: 'center', marginTop: '15px', color: 'blue', fontSize: '20px' }}>Already have an account?</p>
      <Link to="/" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: '#5555FB', color: 'white', borderRadius: '20px', padding: '10px', marginTop: '10px' }}>Login</Link>
    </form>
  </div>
</div>

  );
};

export default SignupPage;
