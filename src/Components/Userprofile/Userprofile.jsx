import React, { useState } from 'react'
import './userprofile.css'
import { useNavigate } from 'react-router-dom'
import { useContext ,useEffect} from 'react'
import AppContext from '../../Context/AppContext'



const Userprofile = (props) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    day:'numeric',
    month:'numeric',
    year:'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second:'2-digit',
    hour12:true
  });
const{date,index}=props;

//  console.log(new Date(date.toDate()).toLocaleString());
  const {setEmail,dp,setDp,setDpImg,setPopupClass2,setPopupClass,isSend,setMobileSize}=useContext(AppContext);
  const navigate=useNavigate();
  //this is just for navigating multiple times in a single page
  useEffect(() => {
    gotoUser();
  })
  
  const gotoUser = (emailId) => {
    if (emailId) {
        navigate(`/${emailId}`)
        setEmail(emailId);
    }
  } 
  const handleClick=()=>{
    gotoUser(props.email);
    setPopupClass2(false);
    setPopupClass(false);
    setMobileSize(true);
   
  }



  return (
    <>
    <div className='user-profile'onClick={handleClick}>
        <div className="user-profile-img">
            {<img src={props.photoUrl} alt="" onClick={()=>{
              setDp(!dp);
              setDpImg(props.photoUrl);
              setPopupClass2(false);
            }}/>}
        </div>
        <div className="user-info">
            <p className="user-name-sidebar">{props.name}</p>
           {<div className="last-msg"style={{color:date?(new Date(date.toDate()).toLocaleString({hour:'numeric',minute:'numeric',second:'2-digit',hour12:true})===formattedDate && isSend===false?'blue':'grey'):''}}>{props.lastmessage ?  ( props.lastmessage.slice(0, 25)):''}
</div>} 
            
        </div>
    </div>
            </>
  )
}

export default Userprofile