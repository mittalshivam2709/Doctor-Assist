// import { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { RESET_PASSWORD } from '../gqloperations/mutations'
// import { useMutation } from '@apollo/client'
// import { useNavigate } from 'react-router-dom'
// import '../loginpage.css'
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// const Forgot_password = () => {
//   const { register, handleSubmit, reset, watch, setError, clearErrors } =
//     useForm()
//   const [data, setData] = useState('')
//   const onSubmit = (data) => {
//     if(!data.email)
//     {
//       alert("Please enter the Email");
//       reset()
//     }
//     setData(JSON.stringify(data))
    
//   }
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
//           Forgot Password
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input
//             {...register('email')}
//             type='email' 
//             placeholder="Enter email"
//           />
//           <br />
//           <input type="submit" value="Submit" />
//           <Link
//             to="/"
//             type="button"
//             className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
//             style={{
//               background: '#65a5e9',
//               color: 'white',
//               backgroundSize: '40px',
//               fontSize: '23px',
//             }}
//           >
//             Back
//           </Link>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Forgot_password


// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useMutation } from '@apollo/client';
// import { RESET_PASSWORD } from '../gqloperations/mutations';
// import { Link } from 'react-router-dom';

// const ForgotPassword = () => {
//   const { register, handleSubmit, reset } = useForm();
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     let intervalId;
//     if (timer > 0) {
//       intervalId = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     }

//     return () => clearInterval(intervalId);
//   }, [timer]);

//   const onSubmit = async (data) => {
//     if (!data.email) {
//       alert("Please enter the Email");
//       return;
//     }
//     console.log("Reset password link sent to:", data.email);
//     setTimer(120);
//   };
//   const handleResendClick = () => {
//     reset(); 
//   };
//   const handleBackClick = () => {
//     reset();
//     setTimer(0);
//   };

//   return (
//     <div className="outerlogin">
//       <div className="login-container">
//         <h2 style={{ color: 'blue', position: 'relative', top: '-20px', fontSize: '30px' }}>
//           Forgot Password
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input {...register('email')} type="email" placeholder="Enter email" />
//           <br />
//           <input type="submit" value="Submit" />
//           {timer > 0 && <p style={{fontSize:'30px',color:'red',position:'relative',top:'-10px',left:'100px'}}>Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}</p>}
//           {timer > 0 && <button type="button" onClick={handleResendClick}>Resend</button>}
//           <Link
//             to="/"
//             onClick={handleBackClick}
//             type="button"
//             className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
//             style={{ background: '#65a5e9', color: 'white', backgroundSize: '40px', fontSize: '23px' }}
//           >
//             Back
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../gqloperations/mutations';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const { register, handleSubmit, reset } = useForm();
  const [timer, setTimer] = useState(0);
  const [resendClicked, setResendClicked] = useState(false);

  useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const onSubmit = async (data) => {
    if (!data.email) {
      alert("Please enter the Email");
      return;
    }
    console.log("Reset password link sent to:", data.email);
    setTimer(120);
    setResendClicked(false); // Reset resendClicked state
  };

  const handleResendClick = () => {
    reset();
    setResendClicked(true); // Set resendClicked to true when Resend button is clicked
  };
  return (
    <div className="outerlogin">
      <div className="login-container">
        <h2 style={{ color: 'blue', position: 'relative', top: '-20px', fontSize: '30px' }}>
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('email')} type="email" placeholder="Enter email" />
          <br />
          <input type="submit" value="Submit" />
          {timer > 0 && !resendClicked && <p style={{ fontSize: '30px', color: 'red', position: 'relative', top: '-10px', left: '100px' }}>Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}</p>}
          {timer > 0 && !resendClicked && <button type="button" onClick={handleResendClick}>Resend</button>}
          <Link
            to="/"
            type="button"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            style={{ background: '#65a5e9', color: 'white', backgroundSize: '40px', fontSize: '23px' }}
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
