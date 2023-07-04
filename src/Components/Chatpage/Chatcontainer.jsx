import './chatcontainer.css'
import { FiMoreVertical } from 'react-icons/fi'
import { MdAttachFile, MdCall, MdOutlineEmojiEmotions } from 'react-icons/md'
import { AiOutlineSend } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import { AiOutlineCopy } from 'react-icons/ai'
import { FaVideo } from 'react-icons/fa'
import {BiBlock} from 'react-icons/bi'
import {MdReportProblem} from 'react-icons/md'

import { BsFillMicFill } from 'react-icons/bs'
import Chatmessage from './Chatmessage'
import AppContext from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import Picker from 'emoji-picker-react'
import { useParams } from 'react-router-dom'
import db from '../../firebase'
import firebase from "firebase";
import { useRef } from 'react'
import sound from '../../Sounds/sendTone.mp3'
import sound2 from '../../Sounds/Send.mp3'


const audio = new Audio(sound);
const audio2 = new Audio(sound2);



const Chatcontainer = (props) => {
    
    const [mic, setMic] = useState(false);
    const [proImg, setProImg] = useState('');
    const chatBox = useRef(null);
    const context = useContext(AppContext);//using context here 
    const {
        msg, setMessage, popupClass, setPopupClass, setPopupClass2, clickChat,
         setIsSend, mobileSize, setMobileSize,setClickChat, copyText, emoji, setEmoji, chatUser, setChatUser, setshowMessages,
        showmessages, currentUserPhoto, newAvtaar, messageId, imageSelect, setImageSelect, image, setImage,profileDisplay, setProfileDisplay
        

    } = context;//destructring from context file
    const onchange = (e) => {
        setMessage(e.target.value)
    }

    //useParams are used to get something from paths
    const { emailID } = useParams();


    //this use effect will take a snapshot of emails which are present in collection while rendering
    useEffect(() => {
        const grabUser = async () => {//grabuser is here used to grabuser onclick on the userprofile in slidebar
            //when we click on userprofile section so param fetch the email and use here to get the right userChats
            return await db.collection("users").doc(emailID).onSnapshot((snapshot) =>
                //setting chatuser state a variable which is used in chatcontainer 
                setChatUser(snapshot.data())

            );
        }

        // calling grabUser
        grabUser();

        //this function is using here to fetch chats from db 
        const getMessages = async () => {
            return await db.collection('chats').doc(emailID).collection('messages').orderBy("timeStamp", "asc").onSnapshot((snapshot) => {
                //getting data in messages using map 
                let messages = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;


                    return { id, ...data };
                });
                //using filter to return array
                let newMessages = messages.filter((message) => message.senderEmail === (props.currentUser.email || emailID) ||
                    message.receiverEmail === (props.currentUser.email || emailID))
                //setting new messages array in this variable
                setshowMessages(newMessages);
            });
        }
        getMessages();
    }, [emailID,proImg])
    //making send function to send message
    const send = (e) => {
        e.preventDefault();
        setIsSend(true);
        if (emailID) {
            let payload = {
                senderEmail: props.currentUser.email,
                receiverEmail: emailID,
                timeStamp: firebase.firestore.Timestamp.now()
            }
            if (imageSelect === true) {
                payload.image = image;
            } else {
                payload.text = msg;
            }

            //we have to send this to sender and reciever
            //this will create a collection chat and messages for both sender and receiver
            db.collection('chats').doc(props.currentUser.email).collection('messages').add(payload);
            db.collection('chats').doc(emailID).collection('messages').add(payload);


            // creating a friendList using their email and set every time new messages
            db.collection('Friendlist').doc(emailID).collection("list").doc(props.currentUser.email)
                .set(
                    {
                        email: props.currentUser.email,
                        fullname: props.currentUser.fullname,
                        photoURL: currentUserPhoto === true ? newAvtaar : props.currentUser.photoURL,
                        lastmessage: imageSelect === true ? 'Photo' : msg,
                        timeStamp: firebase.firestore.Timestamp.now()
                    }
                )
            db.collection('Friendlist').doc(props.currentUser.email).collection("list").doc(emailID)
                .set(
                    {
                        email: chatUser.email,
                        fullname: chatUser.fullname,
                        photoURL: chatUser.photoURL,
                        lastmessage: imageSelect === true ? 'Photo' : msg,
                        timeStamp: firebase.firestore.Timestamp.now()
                    }
                )
            setMessage("");
        }
        audio.volume = 0.5;
        audio.play()
        setImageSelect(false);
     
    }


    const onDelete = (id) => {
        db.collection('chats').doc(emailID).collection('messages').doc(id).delete().then(() => {

            setClickChat(false);
        })
    }
    const handleCopyText = (text) => {
        navigator.clipboard.writeText(text);
        setClickChat(false);
    }
    useEffect(() => {
        chatBox.current.addEventListener("DOMNodeInserted", (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: "smooth" })
        })

    }, [showmessages]);

    const fileInputRef = useRef(null);
    const handleIconClick = () => {
        fileInputRef.current.click();
        setProfileDisplay(false)
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setImage(imageURL);
        setImageSelect(true);
    };

  

    //Using Navigate from one Page to Another
    const navigate = useNavigate();
    return (
        <>
            {<div className="chat-container">
                <div className="chat-container-header">
                    <div className="chat-user-info">
                        <div className="chat-user-img">
                            <img src={chatUser?.photoURL} alt="" onClick={() => {
                                setProfileDisplay(!profileDisplay);
                                setPopupClass2(false)
                                setPopupClass(false);
                                setProImg(chatUser?.photoURL);
                            }} />
                        </div>

                        <p className="user-name">
                            {chatUser?.fullname}
                        </p>
                    </div>
                    <div className="chat-container-header-icon">
                        {clickChat === false ? <div className="call-icons">
                            <MdCall className='icon-call'onClick={()=>{setProfileDisplay(false)}}/>
                            <FaVideo className='icon-video'onClick={()=>setProfileDisplay(false)} />
                        </div> : ''}
                        <div className="container-icons">

                            {clickChat === true ? (<><AiFillDelete className='icon-delete' onClick={() => { onDelete(messageId); }} />
                                <AiOutlineCopy className='icon-dots' onClick={() => { handleCopyText(copyText) }} /></>) : (<FiMoreVertical className='icon-dots' onClick={() => {
                                    setPopupClass(!popupClass);
                                    setPopupClass2(false)
                                }} />)}

                        </div>

                    </div>
                </div>
                <div className="chat-display-container" onClick={() => {
                    setPopupClass(false);
                    setProfileDisplay(false)
                    setEmoji(false);
                    setPopupClass2(false)
                }}>
                    <div className="chat-display-container" ref={chatBox}>
                        {showmessages.map((message) => {
                            if (message.hasOwnProperty('image')) {
                                // Render image message
                                return (
                                    <Chatmessage
                                        image={message.image}
                                        date={message.timeStamp}
                                        sender={message.senderEmail}
                                        key={message.id}
                                        id={message.id}

                                    />
                                );
                            } else if (message.hasOwnProperty('text')) {
                                // Render text message
                                return (
                                    <Chatmessage
                                        message={message.text}
                                        date={message.timeStamp}
                                        sender={message.senderEmail}
                                        key={message.id}
                                        id={message.id}
                                    />
                                );
                            }
                        })}


                    </div>
                    {mic === true ? <div className="mic-div">
                        <div className='bigMic'><BsFillMicFill className='icon-mic' />
                        </div>
                        <div className='cancleMic' onClick={() => { setMic(false) }}>Cancle</div>
                    </div> : ''}
                </div>
                <div className="chat-input" onClick={() => { setPopupClass(false); setPopupClass2(false); }}>
                    {/* Emoji Button */}
                    {emoji && <Picker onEmojiClick={(Emoji) => {
                        setMessage(msg + Emoji.emoji);
                    }} />}
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                    />
                    <div className="chat-input-btn">
                        <MdAttachFile className='icon' onClick={handleIconClick} />
                        <MdOutlineEmojiEmotions className='icon' onClick={() => {
                            setEmoji(!emoji);
                            setProfileDisplay(false);
                        }} />
                    </div>
                    {/* input element */}
                    <div className="input-element">
                        <form onSubmit={send}>
                            <input type="text" name="send" placeholder='Message' value={msg} onChange={onchange} onClick={()=>setProfileDisplay(false)}/>
                        </form>
                    </div>
                    {/* send btn */}
                    <div className="send-btn">
                        {msg === '' && imageSelect === false ? <BsFillMicFill className='icon mic' onClick={() => {setMic(true);setProfileDisplay(false)}} /> : <AiOutlineSend className='icon ' onClick={send} />}

                    </div>
                </div>
                {popupClass === true ? <div className="popup">
                    <div className="list-items">
                        <li onClick={() => {
                            setProfileDisplay(true);
                            setPopupClass(false);
                        }}>Profile</li>
                        <li >Block</li>
                        <li>More</li>
                    </div>
                </div> : ''}
                {profileDisplay===true?<div className="proPage">
                    <div className="proInfo">
                        <div className="proImg">
                            <img src={chatUser?.photoURL} alt="" />
                        </div>
                        <div className="proName">
                            <p className="chatUserName">{chatUser?.fullname}</p>
                        </div>
                        <div className='proEmail'>
                           <h3>Email:</h3>
                           <p className="proE">{chatUser?.email}</p>
                        </div>
                        <div className='block-report'>
                           <p className="pblock">
                            <BiBlock/>Block
                           </p>
                           <p className="pblock">
                            <MdReportProblem/>Report
                           </p>
                        </div>
                    </div>
                </div>:''}

            </div>}
        </>
    )
}

export default Chatcontainer