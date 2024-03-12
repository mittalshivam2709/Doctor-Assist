import { useState } from "react";
import { useForm } from "react-hook-form";
import { LOGIN_USER } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import '../loginpage.css'

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [signinUser, { error, loading, formdata }] = useMutation(LOGIN_USER, {
    onCompleted: (formdata) => {
      console.log(formdata.loginUser);
      // localStorage.setItem("token",formdata.user.token)
      // console.log(formdata.user.token);
      navigate("/home");
    },
  });
  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    setData(JSON.stringify(data));
    signinUser({
      variables: {
        userInput: {
          username: data.username,
          password: data.password,
        },
      },
    });
  };

  return (
    <div className="outerlogin">
    <div className="login-container">
      <h2 style={{color:"blue", position:'relative',top:'-20px',fontSize:'30px'}}>Login Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="Username" />
        <br />
        <input {...register("password")} type="password" placeholder="Password" />
        <br />
        <input type="submit" value="Login" />
      </form>
      <a href="#" style={{color: "blue",position:'relative',left:'130px',top:'10px',fontSize:'20px'}}>Forgot Password?</a>
    </div>
  </div>
  
  );
};

export default LoginPage;
