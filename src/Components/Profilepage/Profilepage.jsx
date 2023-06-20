import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Showprofile from './Showprofile'
import './profilepage.css'



const Profilepage = (props) => {
  return (
    <>
    <div className="profile">
        <div className="profile-container">
        <Sidebar currentUser={props.currentUser} signOut={props.signOut}/>
        {/* Profile-element */}
        <Showprofile currentUser={props.currentUser} signOut={props.signOut}/>
       
        </div>

    </div>
    </>
  )
}

export default Profilepage