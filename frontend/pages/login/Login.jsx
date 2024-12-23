import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate(); // Import the useNavigate hook from react-router-dom
  const[login,setLogin]= useState({
    email:'',
    password:'',
})

const handleChange = (e)=>{
    setLogin({...login,[e.target.name]:e.target.value});

}
const handleSubmit = async (e)=>{
    e.preventDefault();
    try{

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,login);
      console.log(response);
      if(response.status === 200){
        alert('Login Successful')
        Cookies.set('accessToken',response.data.token);
        Cookies.set('userId',response.data.user._id);
        Cookies.set('role',response.data.user.role);
        navigate("/dashboard");
      }
    }catch(error){
      if(error){
        alert(error.response.data.message);
      }
    }
}
const handleClick = () => {
  const passw = document.querySelector('#password');
  if(passw.type!=''){
  if (passw.type === 'password') {
      passw.type = 'text';
  } else {
      passw.type = 'password';
  }
}
};
  return (
    // <div className='login_container'>
    //   {/* <form action="" onSubmit={handleSubmit}>
    //     <label htmlFor="email">Email</label> <br />
    //     <input type="text" id='email' name='email' value={login.email} onChange={handleChange}/> <br />
    //     <label htmlFor="password" >Password</label> <br />
    //     <input type="text" id='password' name='password' value={login.password} onChange={handleChange}/> <br />
    //     <button>Submit</button>
    //   </form> */}
    //   <div className="login_left">
            
    //             <img src="https://img.freepik.com/premium-vector/customer-service-representative-working-laptop-with-headset_1305385-80877.jpg" className="slider" alt=""/>
    //             {/* <img src="https://media.istockphoto.com/id/1366023601/photo/cropped-shot-of-an-attractive-young-female-call-center-agent-working-in-her-office.jpg?s=612x612&w=0&k=20&c=qvv5Fnh0eE5S0n8ARf0ZTqfFPGSs-nX41xnGsABfOZg=" className="slider" alt=""/> */}
    //             {/* <img src="https://img.freepik.com/premium-photo/customer-support-team-providing-assistance-from-modern-call-center-daytime-hours_1143476-3349.jpg?semt=ais_hybrid" className="slider" alt=""/> */}
            
    //     </div>
    //     <div className="login_right">
           
    //         <form id="login-form" className="signupLoginform" onSubmit={handleSubmit}>
    //             <h2>Login</h2>
    //             <label htmlFor="email">Email</label> <br />
    //           <input type="text" id='email' name='email' value={login.email} placeholder="Email" onChange={handleChange} className="login-email"/> <br />
    //           <label htmlFor="password" >Password</label> <br />
    //           <input type="text" id='password' name='password' value={login.password}  placeholder="Password" onChange={handleChange} className="login-pass"/> <br />
    //           <button className="btn-login">Login</button>
    //         </form>
    //         <div className="login_last">
    //           <p>Do not have any account? <a href='/signup' id="signup-btn" className="toggle-btn">Sign Up</a></p>
    //         </div>
    //     </div>

    // </div>

<div className="login-container">
<div className="login-child">
    <div className="login-left">
       
    </div>
    <div className="login-right">
        <div className="login-part">
        <h2>Hi! Welcome to</h2>
        <h2>Ticket Ease</h2>
        <form className="login-form" action="" onSubmit={handleSubmit}>
           
            <label htmlFor="email">Email:</label>
            <br/>
            <div className="login-email">
                <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
                <input type="email" id="email" placeholder="Email" name='email' value={login.email} onChange={handleChange}/>
            </div>
            <label htmlFor="pass">Password:</label>
            <br/>
            <div className="login-pass">
           <label htmlFor="pass"><i className="fa-solid fa-lock"></i></label>
            <input type="password" id="password" placeholder="Password" name='password' value={login.password} onChange={handleChange}/>
            <i className="fa-solid fa-eye" onClick={handleClick}></i>
            </div>
            <button type="submit" id="login-btn">Login</button>
        </form>
        <div className="login_last">
            <p>
              Don't have an acount?
              <a href="/signup" id="login-link" className="toggle-btn">
                Signup
              </a>
            </p>
          </div>
    </div>
</div>
</div>
</div>
  )
}
