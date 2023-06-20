import React from 'react'
import './login.css'
import loginImg from '../../Assests/loginLogo.png'
import google from '../../Assests/google.png'
import db,{ auth,goolgleProvider } from '../../firebase'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
  const navigate=useNavigate();

  //function for signwith google
  const signInWithGoogle=()=>{
    auth
    .signInWithPopup(goolgleProvider)
    .then((result)=>{
      //store details of login user in newUser 
      const newUser={
        fullname:result.user.displayName,
        email:result.user.email,
        photoURL:result.user.photoURL
      }
      navigate('/');
      props.setUser(newUser);
      //storing newUser into local storage for login or logout
      localStorage.setItem('user',JSON.stringify(newUser));
    //storing data in database in firebase name collection<<users
      db.collection("users").doc(result.user.email).set(newUser);
    })
    .catch((err)=>alert(err.message));
  }
    return (
    <>
    <div className="login">
      <div className="login-container">
        <img src={loginImg} className="login-logo"alt=""/>
        <p className="login-name">Rapid-Chat</p>
        <button className="login-btn"onClick={signInWithGoogle}>
          <img src={google} alt="" />
          Login with Google
        </button>
      </div>
    </div>
    </>
  )
}

export default Login