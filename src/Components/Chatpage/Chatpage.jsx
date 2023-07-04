import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Chatcontainer from './Chatcontainer'
import './chatpage.css'
import { useContext } from 'react'
import AppContext from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'


const Chatpage = (props) => {
  const {setLogout,logout,setCurrentUserPhoto,setPopupClass2}=useContext(AppContext);
  const navigate=useNavigate();
  const handleSignout=()=>{
    props.signOut();
    setCurrentUserPhoto(false);
    setPopupClass2(false);
    navigate('/login');
    setLogout(false);
  }

  return (
    <>
      <div className="chatpage">
        <div className="chatpage-container">
          {/* Getting Sidebar and ChatContainer Component in This Page Only */}
          <Sidebar currentUser={props.currentUser}/>
          {<Chatcontainer currentUser={props.currentUser}/> }
         {logout===true? <div className='logout'>
            <p className='logout-title'>
              Do You Want To Logout?
            </p>
            <div className="log-btn">
                <div className="cancle"onClick={()=>setLogout(false)}>Cancle</div>
                <div className="confirm"onClick={()=>{handleSignout()}}>Confirm</div>
              </div>
            
          </div>:''}
        </div>
      </div>
    </>
  )
}

export default Chatpage