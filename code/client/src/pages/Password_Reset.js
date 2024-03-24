import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RESET_PASSWORD } from '../gqloperations/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import '../loginpage.css'
import { Link } from 'react-router-dom'

const Password_Reset = () => {
  const { register, handleSubmit, reset, watch, setError, clearErrors } =
    useForm()
  const [data, setData] = useState('')
  const navigate = useNavigate()
  const newpassword = watch('newpassword')
  const renewpassword = watch('renewpassword')

  const [passwordrst, { error, loading, formdata }] = useMutation(
    RESET_PASSWORD,
    {
      onCompleted: (formdata) => {
        console.log(formdata.loginUser)
        // localStorage.setItem("token",formdata.user.token)
        // console.log(formdata.user.token);
        navigate('/')
      },
      onError: (error) => {
        alert(error.message)
        reset()
      },
    }
  )
  const onSubmit = (data) => {
    // console.log('Form data submitted:', data)
    if (newpassword !== renewpassword) {
      alert('Passwords do not match')
      setError('renewpassword', {
        type: 'manual',
        message: 'Passwords do not match',
      })
      return
    }
    clearErrors('renewpassword')
    // console.log('', data)
    setData(JSON.stringify(data))
    passwordrst({
      variables: {
        userInput: {
          username: data.username,
          password: data.newpassword,
        },
      },
    })
  }
  // useEffect(() => {
  //   if (error) {
  //     alert(error.message);
  //   }
  // }, [error]);
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
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('username')} placeholder="Username" />
          <br />
          <input
            {...register('newpassword')}
            type="password"
            placeholder="Enter new password"
          />
          <input
            {...register('renewpassword')}
            type="password"
            placeholder="Re-enter password"
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default Password_Reset
