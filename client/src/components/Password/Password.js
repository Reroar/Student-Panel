import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import avatar from '../../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../../helper/validate'
import useFetch from '../../hooks/fetch.hook';
import { useAuthStore } from '../../store/store'
import { verifyPassword } from '../../helper/helper'
import logo from '../../img/logo.png';
// import styles from '../../styles/Username.module.css';

export default function Password() {

  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues : {
      password : 'admin@123'
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <main>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <form onSubmit={formik.handleSubmit}  class="sign-in-form">
              <div class="logo">
                <img className='lugo' src={logo} alt="easyclass" />
                <h4 className='lugo'>Student Portal</h4>
              </div>

              <div class="heading">
                <h2>Welcome Back</h2>
                <h6>Forgot Password?<Link className='' to='/recovery'>Recover Now</Link></h6>
                {/* <!-- <a href="#" class="toggle">Sign up</a> --> */}
              </div>

                <div class="input-wrap">
                  <input
                    class="input-field"
                    {...formik.getFieldProps('password')}  type='text' placeholder='Password'
                  />
                </div>

                {/* <!-- <input type="submit" value="Sign In" class="sign-btn" /> --> */}
                <button type='submit' class="sign-btn">Let's Go</button>

                <p class="text">
                  Forgotten your password or you login datails?
                  <a href="#">Get help</a> signing in
                </p>
            </form>
            </div>
            </div>
            </div>
            </main>  )
}
