// import React, { useState } from 'react'
// import '../pages/SignupPage.css'
// import Axios from "axios"
// import {Link } from "react-router-dom";


// const handleSubmit = (e) => {
//   e.preventDefault()
//   Axios.port('https://localhost:3000/auth/signup', {
//     username,
//     email,
//     password,
//   }).then(response => {
//     console.log(response)
//   }).catch(error => {
//     console.log(error)
//   })
// }

// const SignupPage = () => {
//   const [username, setUsername] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   return (
//     <div className="outersignup">
//       <div className="sign-up-container">
//         <form className="sign-up-form" onSubmit={handleSubmit}>
//           <h2 className="sp">Sign Up</h2>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             placeholder="Username"
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             autoComplete="off"
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             placeholder="******"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button type="submit" className="signupbutton">
//             Sign up
//           </button>
//         <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
//           Login
//          </Link>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default SignupPage



import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { SIGNUP_USER } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import '../pages/SignupPage.css'
import {Link } from "react-router-dom";

const SignupPage = () => {
  const { register, handleSubmit,reset } = useForm();
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [signupUser, { error, loading, formdata }] = useMutation(SIGNUP_USER, {
    onCompleted: (formdata) => {
      // localStorage.setItem("token",formdata.user.token)
      navigate("/home");
    },
    onError: (error) => {
      alert(error.message);
      reset();
    }
  });
  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    setData(JSON.stringify(data));
    signupUser({
      variables: {
        userInput: {
          username: data.username,
          password: data.password,
          doctor_name: data.doctor_name,
          doctor_degree: data.doctor_degree,
          doctor_mobile: data.doctor_mobile,
          doctor_visit: data.doctor_visit
        },
      },
    });
  };
  // useEffect(() => {
  //   if (error) {
  //     alert(error.message);
  //   }
  // }, [error]);
  return (
    <div className="outerlogin">
    <div className="login-container">
      <h2 style={{color:"blue", position:'relative',top:'-20px',fontSize:'30px'}}>Signup Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="Username" />
        <br />
        <input {...register("password")} type="password" placeholder="Password" />
        <br />
        <input {...register("doctor_name")} placeholder="Doctor's Name" />
        <br />
        <input {...register("doctor_degree")} placeholder="Doctor's Degree" />
        <br />
        <input {...register("doctor_mobile")} placeholder="Doctor's Mobile" />
        <br />
        <input {...register("doctor_visit")} placeholder="Doctor's visit" />
        <br />
        <input type="submit" value="Signup" />
      </form>
      <Link to='/ ' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
          Login
         </Link>
    </div>
  </div>
  
  );
};

export default SignupPage;
