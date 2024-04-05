
// // import { useState, useEffect } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { Link } from 'react-router-dom';
// // import Navbar_on_loginpage from '../components/Navbar_on_loginpage.js';
// // import '../pages/forgotpass.css';


// // const ForgotPassword = () => {
// //   const { register, handleSubmit, reset } = useForm();
// //   const [timer, setTimer] = useState(0);
// //   const [resendClicked, setResendClicked] = useState(false);

// //   useEffect(() => {
// //     let intervalId;
// //     if (timer > 0) {
// //       intervalId = setInterval(() => {
// //         setTimer((prevTimer) => prevTimer - 1);
// //       }, 1000);
// //     }

// //     return () => clearInterval(intervalId);
// //   }, [timer]);

// //   const onSubmit = async (data) => {
// //     if (!data.email) {
// //       alert("Please enter the Email");
// //       return;
// //     }
// //     console.log("Reset password link sent to:", data.email);
// //     setTimer(120);
// //     setResendClicked(false); // Reset resendClicked state
// //   };

// //   const handleResendClick = () => {
// //     reset();
// //     setResendClicked(true); // Set resendClicked to true when Resend button is clicked
// //   };
// //   return (
// // <div>
// //       <Navbar_on_loginpage />
// //       <div className="login-container">
// //         <div className="login-form">
// //           <h2 className="login-heading">Forgot Password</h2>
// //           <form onSubmit={handleSubmit(onSubmit)} className="login-form">
// //             <input {...register('email')} type="email" placeholder="Enter email" className="login-input" />
// //             <br />
// //             <input type="submit" value="Submit" className="login-submit" />
// //             {timer > 0 && !resendClicked && <p style={{ fontSize: '20px', color: 'red' }}>Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}</p>}
// //             {timer > 0 && !resendClicked && <button type="button" onClick={handleResendClick} className="login-submit">Resend</button>}
// //             <Link to="/" className="login-link">Back to Login</Link>
// //           </form>
// //         </div>
// //       </div>
// //     </div>

// //   );
// // };

// // export default ForgotPassword;
// // import { useState, useEffect } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { Link } from 'react-router-dom';
// // import Navbar_on_loginpage from '../components/Navbar_on_loginpage.js';
// // import '../pages/forgotpass.css';

// // const ForgotPassword = () => {
// //   const { register, handleSubmit, reset } = useForm();
// //   const [timer, setTimer] = useState(0);
// //   const [resendClicked, setResendClicked] = useState(false);

// //   useEffect(() => {
// //     let intervalId;
// //     if (timer > 0) {
// //       intervalId = setInterval(() => {
// //         setTimer((prevTimer) => prevTimer - 1);
// //       }, 1000);
// //     }

// //     return () => clearInterval(intervalId);
// //   }, [timer]);

// //   const onSubmit = async (data) => {
// //     if (!data.email) {
// //       alert("Please enter the Email");
// //       return;
// //     }
// //     console.log("Reset password link sent to:", data.email);
// //     setTimer(120);
// //     setResendClicked(false); // Reset resendClicked state
// //   };

// //   const handleResendClick = () => {
// //     reset();
// //     setResendClicked(true); // Set resendClicked to true when Resend button is clicked
// //   };

// //   return (
// //     <div className="forgot-password-container">
// //       <Navbar_on_loginpage />
// //       <div className="forgot-password-form">
// //         <h2 className="forgot-password-heading">Forgot Password</h2>
// //         <form onSubmit={handleSubmit(onSubmit)} className="login-form">
// //           <input {...register('email')} type="email" placeholder="Enter email" className="forgot-password-input" />
// //           <br />
// //           <input type="submit" value="Submit" className="forgot-password-submit" />
// //           {timer > 0 && !resendClicked && <p className="timer-text">Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}</p>}
// //           {timer > 0 && !resendClicked && <button type="button" onClick={handleResendClick} className="resend-button">Resend</button>}
// //           <Link to="/" className="back-to-login-link">Back to Login</Link>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ForgotPassword;
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';
// import Navbar_on_loginpage from '../components/Navbar_on_loginpage.js';
// import '../pages/forgotpass.css';

// const ForgotPassword = () => {
//   const { register, handleSubmit, reset } = useForm();
//   const [timer, setTimer] = useState(0);
//   const [resendClicked, setResendClicked] = useState(false);

  // useEffect(() => {
  //   let intervalId;
  //   if (timer > 0) {
  //     intervalId = setInterval(() => {
  //       setTimer((prevTimer) => prevTimer - 1);
  //     }, 1000);
  //   }

  //   return () => clearInterval(intervalId);
  // }, [timer]);

  // const onSubmit = async (data) => {
  //   if (!data.email) {
  //     alert("Please enter the Email");
  //     return;
  //   }
  //   console.log("Reset password link sent to:", data.email);
  //   setTimer(120);
  //   setResendClicked(false); // Reset resendClicked state
  // };

  // const handleResendClick = () => {
  //   reset();
  //   setResendClicked(true); // Set resendClicked to true when Resend button is clicked
  // };

//   return (
//     <div className="forgot-password-container">
//       <Navbar_on_loginpage />
//       <div className="forgot-password-form">
//         <h2 className="forgot-password-heading">Forgot Password</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="login-form">
//           <input {...register('email')} type="email" placeholder="Enter email" className="forgot-password-input" />
//           <br />
//           <input type="submit" value="Submit" className="forgot-password-submit" />
//           {timer > 0 && !resendClicked && <p className="timer-text">Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}</p>}
//           {timer > 0 && !resendClicked && <button type="button" onClick={handleResendClick} className="resend-button">Resend</button>}
//           <Link to="/" className="back-to-login-link">Back to Login</Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Navbar_on_loginpage from '../components/Navbar_on_loginpage.js';
import '../pages/newauth.css';

const ForgotPasswordPage = () => {
  const { register, handleSubmit ,reset} = useForm();
  const [timer, setTimer] = useState(0);
  const [resendClicked, setResendClicked] = useState(false);

  // const onSubmit = (data) => {
  //   // Handle form submission logic
  //   console.log('Form data submitted:', data);
  // };

  // const handleResendClick = () => {
  //   // Handle resend logic
  //   setResendClicked(true);
  //   // Start timer again
  //   setTimer(60);
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => prevTimer - 1);
  //   }, 1000);
  //   setTimeout(() => {
  //     clearInterval(interval);
  //   }, 60000);
  // };
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
    <div>
      <Navbar_on_loginpage />
        <div>
         <form onSubmit={handleSubmit(onSubmit)} className="login-form">
         <h2 className="forgot-password-heading">Forgot Password</h2>
           <input {...register('email')} type="email" placeholder="Enter email" className="forgot-password-input" />
           <br />
          <input type="submit" value="Submit" className="forgot-password-submit" />
          {timer > 0 && !resendClicked && <p className="timer-text">Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}</p>}
          {timer > 0 && !resendClicked && <button type="button" onClick={handleResendClick} className="resend-button">Resend</button>}
          <Link to="/" className="back-to-login-link">Back to Login</Link>
         </form>
       </div>
      </div>
  );
};

export default ForgotPasswordPage;
