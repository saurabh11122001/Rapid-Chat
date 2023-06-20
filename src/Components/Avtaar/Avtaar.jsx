import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Changeavtaar from './Changeavtaar'
import './avtaar.css'

const Avtaar = (props) => {
    return (
        <>
            <div className="change-avtaar">
                <div className="avtaar-main">
                    <Sidebar currentUser={props.currentUser} signOut={props.signOut}/>
                    {/* Profile-element */}
                    {/* <Showprofile currentUser={props.currentUser} signOut={props.signOut}/> */}
                    <Changeavtaar currentUser={props.currentUser}/>
                </div>

            </div>
        </>
    )
}

export default Avtaar