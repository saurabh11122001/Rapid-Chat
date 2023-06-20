import React,{useContext,useEffect} from 'react'
import './showprofile.css'
import {IoIosArrowBack} from 'react-icons/io'
import {MdContentCopy} from 'react-icons/md'
import {BiBlock} from 'react-icons/bi'
import {MdReportProblem} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import AppContext from '../../Context/AppContext'
import db from '../../firebase'

const Showprofile = (props) => {
  const {email,chatUser,check,setCheck,setPopupClass2}=useContext(AppContext);
    const emailID=email;
    const navigate=useNavigate();
    useEffect(() => {
        const grabUser=async()=>{
          return await db.collection("users").doc(emailID).onSnapshot((snapshot)=>
          {setCheck(snapshot.data())}
          )
        }
        grabUser();
        
      }, [])
  return (
    <>
    <div className="showprofile-container"onClick={()=>setPopupClass2(false)}>
        <div className="profile-header">
            <p className="heading"><IoIosArrowBack className="icon"onClick={()=>{
                navigate(`/${emailID}`);
            }}/>
                Profile
            </p>
        </div>
        <div className='profile-image'>
            <div className="img">
                <img src={chatUser?.photoURL} alt="" />
            </div>
            <div className="Options">
                <div className="name">
                <p>{chatUser?.fullname}</p><p><MdContentCopy className='icon-copy'/></p>
                </div>
                <div className="otheropt">

                <p className='report'><MdReportProblem/>Report this Person</p>
                <p className='block'><BiBlock/>Block this Person</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Showprofile