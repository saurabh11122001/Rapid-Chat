import React, { useState } from 'react'
import './userprofile.css'
import { useNavigate } from 'react-router-dom'
import { useContext ,useEffect} from 'react'
import AppContext from '../../Context/AppContext'
import { auth } from '../../firebase'



const Userprofile = (props) => {
 
  const {setEmail,dp,setDp,setDpImg,setPopupClass2,setPopupClass}=useContext(AppContext);
  const navigate=useNavigate();
  //this is just for navigating multiple times in a single page
  useEffect(() => {
    gotoUser();
  }, [])
  
  const gotoUser = (emailId) => {
    if (emailId) {
        navigate(`/${emailId}`)
        // navigate(`/chatpage`)
        setEmail(emailId);
    }
  } 
  const handleClick=()=>{
    gotoUser(props.email);
    console.log(props.email);
    setPopupClass2(false);
    setPopupClass(false);
  }
 
 
 
  return (
    <>
    <div className='user-profile'>
        <div className="user-profile-img">
            {<img src={props.photoUrl} alt="" onClick={()=>{
              setDp(!dp);
              setDpImg(props.photoUrl);
              setPopupClass2(false);
            }}/>}
        </div>
        <div className="user-info"onClick={handleClick}>
            <p className="user-name-sidebar">{props.name}</p>
            <div className="last-msg"> {props.lastmessage ? props.lastmessage.slice(0,25) : ""}
            </div>
        </div>
    </div>
            </>
  )
}

export default Userprofile