import React, { useState } from 'react'
import './sidebar.css'
import userImg from '../../Assests/user.png'
import { MdInsertComment } from 'react-icons/md'
import { BsEmojiSmileUpsideDown } from 'react-icons/bs'
import { FiMoreVertical } from 'react-icons/fi'
import { CiSettings } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { BiCopyright } from 'react-icons/bi'
import Userprofile from '../Userprofile/Userprofile'
import db from '../../firebase'
import { useEffect } from 'react'
import { useContext } from 'react'
import AppContext from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
const Sidebar = (props) => {
    const [cUser,setCuser]=useState(false);
    const [setting,setSetting]=useState(false);
    // for signout
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const { allUsers, setAllUsers,logout,setLogout,setProfileDisplay,searchInput,messageIcon,setIsSend,setMessageIcon,setSearchInput, popupClass2,setPopupClass2, dp, setDp, setDpImg, dpImg, friendsList, setFriendsList, allContacts, setAllContacts, allContactsTitle, setAllContactsTitle, newAvtaar, currentUserPhoto, setCurrentUserPhoto, setSearchTitle, searchTitle } = context;

    // console.log("newAvtaar value",props.newAvtaar);
    // whenever our component will render this useEffect will work
    useEffect(() => {

        //fetching all users which are currently logged in for >>>>SideBar
        const getAllUsers = async () => {
            return await db.collection("users").onSnapshot((snapshot) => {
                setAllUsers(
                    snapshot.docs.filter((doc) => doc.data().email !== props.currentUser?.email)//this condition is just for not to get itself
                )
            })
        }
        getAllUsers();
        //for getting friends just like we sent msg to the latest people recent
        const getFriends = async () => {
            return await db.collection('Friendlist').doc(props.currentUser.email).collection('list').onSnapshot((snapshot) => {
                setFriendsList(snapshot.docs);
            })
        }
        getFriends();

        const showAllContacts = async () => {
            return db.collection("users").onSnapshot((snapshot) => {
                setAllContacts(snapshot.docs.filter((doc) => doc.data().email !== props.currentUser?.email))
            })
        }
        showAllContacts();

    }, [newAvtaar]);

    const allContactsHere = allContacts.map((contact) => {
        return (
            <Userprofile name={contact.data().fullname} photoUrl={contact.data().photoURL} key={contact.id} email={contact.data().email} />
        )
    })

    //so now here our setAlluser already set someething on allUser state
    //this method will fetch all data from alluser and use filter method to store them in an array
    const searchUser = allUsers.filter((user) => {
        if (searchInput) {
            if (user.data().fullname.toLowerCase().includes(searchInput.toLowerCase()) || user.data().email.toLowerCase().includes(searchInput.toLowerCase())) {  //it is used to search people from database
                return user //it will return an array of people and stored in searchUser variable
            }
        }
    })


    //now we are using map to show all the users through return it will iterate every user in array or object
    const searchItem = searchUser.map((user) => {
        return (
            <Userprofile name={user.data().fullname} photoUrl={user.data().photoURL} key={user.id} email={user.data().email}/>
        )
    })




    return (
        <>
            <div className="sidebar"onClick={()=>setProfileDisplay(false)}>
                <div className="sidebar-header">
                    <div className="sidebar-header-img">
                        {currentUserPhoto === true ? <img src={newAvtaar} alt="" onClick={() => {
                            setDp(!dp);
                            setDpImg(newAvtaar);
                            setPopupClass2(false)
                            setCuser(true);
                        }} /> : <img src={props.currentUser?.photoURL} alt="" onClick={() => {
                            setDp(!dp);
                            setDpImg(props.currentUser?.photoURL);
                            setPopupClass2(false)
                            setCuser(true);
                        }} />}
                    </div>
                    <div className="app-name "><div className='app'>RapidChat</div></div>
                    <div className="sidebar-header-btn">
                        <BsEmojiSmileUpsideDown className='icon smile' onClick={() => { navigate('/avtaar'); setPopupClass2(false);}} />
                        <MdInsertComment className='icon' onClick={() => {
                            setMessageIcon(true);
                            setSearchTitle(false);
                            setAllContactsTitle(true);
                            setPopupClass2(false);
                        }} />
                        <FiMoreVertical className='icon threedot' onClick={() => {
                            setPopupClass2(!popupClass2);  
                        }} />
                        <CiSettings className='icons setting'onClick={()=>{setSetting(!setting)}}/>
                    </div>
                </div>
                <div className="sidebar-search">
                    <div className="sidebar-input-search" onClick={() => { setPopupClass2(false); setSearchTitle(!searchTitle); }}>
                        <FaSearch className='icon' />
                        <input type="text" name="search" placeholder='Search...' value={searchInput} onChange={(e) => { setSearchInput(e.target.value)}} onClick={() => { setPopupClass2(false);setAllContactsTitle(false);setMessageIcon(false)}}/>
                    </div>
                </div>
                <div className="contacts-title"onClick={()=>{setMessageIcon(false)}}> {allContactsTitle === true ? (
                    <p className="title">All Contacts</p>
                ) : searchItem.length > 0 ? (
                    <p className="title">Searching...</p>
                ) : (
                    <p className="title">Recent</p>
                )}</div>
                <div className="sidebar-chat-list">
                    {/* {if searchItem's length greater than 0 means something searched it will display searchItem if not then add recent friends} */}
                    {messageIcon === true ? allContactsHere : (searchItem.length > 0) ? (searchItem) : (friendsList.map((frnds,index) => {
                        return (
                            <Userprofile name={frnds.data().fullname} photoUrl={frnds.data().photoURL} key={frnds.id} email={frnds.data().email} lastmessage={frnds.data().lastmessage}date={frnds.data().timeStamp}index={index}/>
                        )
                    }))}

                </div>
                {popupClass2 === true ? <div className="more-opt-sidebar">
                    <div className="list-items">
                        <li onClick={()=>{
                            setSetting(true);
                        }}>Settings</li>
                        <li onClick={() => {
                            navigate('/avtaar')
                            setPopupClass2(!popupClass2)
                        }}>Avtaar</li>
                        <li onClick={()=>{setLogout(true);setSetting(false)}} >Logout</li>

                    </div>
                </div> : <div className="remove">
                    <div className="list-items">
                        <li>My Profile</li>
                        <li>Logout</li>
                        <li>Avtaar</li>
                    </div>
                </div>}
                {dp === true ? <div className="img-container">
                    <IoMdClose className='icon' onClick={() => {
                        setDp(false);
                        setCuser(false);
                    }} />
                    {cUser===true?<div className="user-email">
                            {props.currentUser.email}
                        </div>:''}
                    <div className="img-div">
                        <img src={dpImg} alt="" />
                    </div>
                </div> : ''}
              { setting===true?<div className="logout-op"onClick={()=>{setLogout(true);setSetting(false)}}>
                <p>Logout</p>
               </div>:''}
                <div className="copyright">
                    <p><BiCopyright className='icon' />All Rights Reserved - @saurabh-rautela</p>
                </div>
            </div>
        </>
    )
}


export default Sidebar