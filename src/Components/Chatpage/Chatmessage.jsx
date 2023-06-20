import React from 'react'
import './chatmessage.css'
import { auth } from '../../firebase';

import doubleTick from '../../Assests/double-tick.png'
const Chatmessage = (props) => {
  const {message,date,sender}=props;
// const {setDot,dot}=useContext(AppContext);


// console.log(dot)
  return (
    <>
    <div className="chat-message"style={{alignSelf:sender === auth?.currentUser?.email?'flex-end':'flex-start',
  backgroundColor:sender === auth?.currentUser?.email?'bluevoilet':'aliceblue',
  color:sender === auth?.currentUser?.email?'aliceblue':'black'}}>
        <div className="chat-message-text">
            <p className='Sender-Message'>{message}</p>
        </div>
        <div className="chat-message-date-time">
            <div className="date-time">
            <p className="date">
            {new Date(date.toDate()).toLocaleString()}
            </p>
           {sender===auth?.currentUser?.email?<p className='double-tick'><img src={doubleTick} alt="" /></p>:<p></p>}
            </div>
        </div>
    </div>
    </>
  )
}

export default Chatmessage