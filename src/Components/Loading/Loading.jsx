import React from 'react'
import './loading.css'
import loginImg from '../../Assests/loginLogo.png'
const Loading = () => {
  return (
    <>
     <div className="loading">
      <div className="loading-container">
        <img src={loginImg} className="login-logo"alt=""/>
        <p>Loading....</p>
      </div>
    </div>
    </>
  )
}

export default Loading