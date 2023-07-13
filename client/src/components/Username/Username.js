import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../../helper/validate'
import { useAuthStore } from '../../store/store'
import logo from '../../img/logo.png';
import './Username.css'

// import styles from '../styles/Username.module.css';


export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);
  // useAuthStore(state => console.log(state));

  const formik = useFormik({
    initialValues : {
      username : 'example123'
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      console.log(values);
      setUsername(values.username);
      navigate('/password')
    }
  })

  return (
    <main>
      <Toaster position="top-center" reverseOrder="{false}"></Toaster>
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <form onSubmit={formik.handleSubmit} autocomplete="off" class="sign-in-form">
              <div class="logo">
                <img className='lugo' src={logo} alt="easyclass" />
                <h4 className='lugo'>Student Portal</h4>
              </div>

              <div class="heading">
                <h2>Welcome Back</h2>
                <h6>Not registred yet?<Link className='toggle' to='/register'>Register Now</Link></h6>
                {/* <!-- <a href="#" class="toggle">Sign up</a> --> */}
              </div>

              <div class="actual-form">
                <div class="input-wrap">
                  <input
                  {...formik.getFieldProps('username')}  type='text' placeholder='Username'
                  class="input-field"
                  />
                </div>

                {/* <input type="submit" value="Sign In" class="sign-btn" /> */}
                <button className='sign-btn' type='submit'>Let's Go</button>

                <p class="text">
                  Forgotten your password or you login datails?
                  <a href="#">Get help</a> signing in
                </p>
              </div>
            </form>
            </div>
            </div>
            </div>
        
    </main>  )
}
