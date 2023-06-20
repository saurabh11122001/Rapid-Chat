import React from 'react'
import './home.css'
import Sidebar from '../Sidebar/Sidebar'
import Applogo from '../../Assests/applogo.png'
import { useContext } from 'react'
import AppContext from '../../Context/AppContext'

const Home = (props) => {
  const {setPopupClass2}=useContext(AppContext)
  return (
    <>
    <div className='home'>
        <div className="home-container">
            <Sidebar currentUser={props.currentUser}signOut={props.signOut}/>
            {/* Container with Logo */}
            <div className="home-bg"onClick={()=>{setPopupClass2(false)}}>
                <img src={Applogo} alt="" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Home