import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Chatcontainer from './Chatcontainer'
import './chatpage.css'



const Chatpage = (props) => {
  

  return (
    <>
      <div className="chatpage">
        <div className="chatpage-container">
          {/* Getting Sidebar and ChatContainer Component in This Page Only */}
          <Sidebar currentUser={props.currentUser}signOut={props.signOut}/>
          {<Chatcontainer currentUser={props.currentUser}/> }
        </div>
      </div>
    </>
  )
}

export default Chatpage