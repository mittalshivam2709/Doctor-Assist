import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
  
    return (
      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
        <input {...register("username")} placeholder="user name" />
        <input {...register("password")} placeholder="password" />
        <input type="submit" />
      </form>
    );
}

export default LoginPage