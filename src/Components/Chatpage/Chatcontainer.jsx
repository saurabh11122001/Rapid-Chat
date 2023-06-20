import './chatcontainer.css'
import { FiMoreVertical } from 'react-icons/fi'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import { AiOutlineSend } from 'react-icons/ai'
import { IoMdAttach } from 'react-icons/io'
import { BsFillMicFill } from 'react-icons/bs'
import Chatmessage from './Chatmessage'
import AppContext from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Picker from 'emoji-picker-react'
import { useParams } from 'react-router-dom'
import db from '../../firebase'
import firebase from "firebase";
import { useRef } from 'react'



const Chatcontainer = (props) => {
    const chatBox=useRef(null);
    const context = useContext(AppContext);//using context here 
    const { msg, setMessage, popupClass, setPopupClass,setPopupClass2, emoji, setEmoji, chatUser, setChatUser, setshowMessages, showmessages,email,setEmail,selectPhoto,setSelectPhoto,currentUserPhoto,newAvtaar} = context;//destructring from context file
    const onchange = (e) => {
        setMessage(e.target.value)
    }

    //useParams are used to get something from paths
    const {emailID}=useParams();


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
    }, [emailID])
    //making send function to send message
    const send = (e) => {
        e.preventDefault();
        if (emailID) {
            let payload = {
                text: msg,
                senderEmail: props.currentUser.email,
                receiverEmail: emailID,
                timeStamp: firebase.firestore.Timestamp.now()
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
                        photoURL: currentUserPhoto===true?newAvtaar:props.currentUser.photoURL,
                        lastmessage: msg
                    }
                )
            db.collection('Friendlist').doc(props.currentUser.email).collection("list").doc(emailID)
                .set(
                    {   
                        email: chatUser.email,
                        fullname: chatUser.fullname,
                        photoURL: chatUser.photoURL,
                        lastmessage: msg
                    }
                )
            setMessage("");
        }
    }
    useEffect(() => {
        chatBox.current.addEventListener('DOMNodeInserted',(Event)=>{
            const {currentTarget:target}=Event;
            target.scroll({top:target.scrollHeight,behavior:'smooth'})
        })
    }, [showmessages])
    
  

    //Using Navigate from one Page to Another
    const navigate = useNavigate();

    return (
        <>
        {<div className="chat-container">
                <div className="chat-container-header">
                    <div className="chat-user-info">
                        <div className="chat-user-img">
                            <img src={chatUser?.photoURL} alt="" onClick={() => {
                                navigate('/friends_profile');
                                setPopupClass2(false)
                                setPopupClass(false);
                            }} />
                        </div>
                        <p className="user-name">
                            {chatUser?.fullname}
                        </p>
                    </div>
                    <div className="chat-container-header-icon">
                        <FiMoreVertical className='icon' onClick={() => {
                            setPopupClass(!popupClass);
                            setPopupClass2(false)
                        }} />
                    </div>
                </div>
                <div className="chat-display-container"ref={chatBox} onClick={() => {
                    setPopupClass(false);
                    setEmoji(false);
                    setPopupClass2(false)
                }}>
                    <div className="chat-display-container">
                        {
                            showmessages.map((message,index) => {
                                // console.log(message.docId)
                                return (<Chatmessage message={message.text} date={message.timeStamp} sender={message.senderEmail} key={message.id}/>)
                            })
                        }

                    </div>
                </div>
                <div className="chat-input"onClick={()=>{ setPopupClass(false); setPopupClass2(false);}}>
                    {/* Emoji Button */}
                    {emoji && <Picker onEmojiClick={(Emoji) => {
                        setMessage(msg + Emoji.emoji);
                    }} />}
                    <div className="chat-input-btn">
                        <MdOutlineEmojiEmotions className='icon' onClick={() => {
                            setEmoji(!emoji);
                        }} />
                    </div>
                    {/* input element */}
                    <div className="input-element">
                        <form onSubmit={send}>
                            <input type="text" name="send" placeholder='Message' value={msg} onChange={onchange} />
                        </form>
                    </div>
                    {/* send btn */}
                    <div className="send-btn">
                        {msg===''?<BsFillMicFill className='icon mic'/>:<AiOutlineSend className='icon ' onClick={send} />}
                    </div>
                </div>
                {popupClass === true ? <div className="popup">
                    <div className="list-items">
                        <li onClick={() => {
                            navigate('/friends_profile')
                        }}>Profile</li>
                        <li>Block</li>
                        <li>More</li>
                    </div>
                </div> :''}
            

            </div>}
        </>
    )
}

export default Chatcontainer