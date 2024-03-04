import { useState } from "react";
import { useForm } from "react-hook-form";
import { LOGIN_USER } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="user name" />
      <input {...register("password")} placeholder="password" />
      <input type="submit" />
    </form>
  );
};

export default LoginPage;
