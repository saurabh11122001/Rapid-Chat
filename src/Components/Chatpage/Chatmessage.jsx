import React, { useContext, useEffect, useState } from 'react'
import './chatmessage.css'
import { auth } from '../../firebase';

import doubleTick from '../../Assests/double-tick.png'
import AppContext from '../../Context/AppContext';




const Chatmessage = (props) => {
  const { message, date, sender, image } = props;

  const { setMessageId, clickChat, setClickChat, setIsSend, tryy, messageId, setCopyText, isSend } = useContext(AppContext);

  useEffect(() => {
    if (sender !== auth?.currentUser?.email) {
      setIsSend(false);
    }
  }, [sender])
  return (
    <>
      <div onClick={() => { setMessageId(props.id);setClickChat(!clickChat); setCopyText(message) }} className={`${clickChat === true && messageId === props.id ? 'chat-message-fade' : 'chat-message'}`} style={{
        alignSelf: sender === auth?.currentUser?.email ? 'flex-end' : 'flex-start',
        backgroundColor: sender === auth?.currentUser?.email ? 'bluevoilet' : 'aliceblue',
        color: sender === auth?.currentUser?.email ? 'aliceblue' : 'black',
        borderRadius: sender === auth?.currentUser?.email ? '20px 20px 0 20px' : '0 20px 20px 20px'

      }}>
        {image ? (
    <div className="chat-message-image"onClick={() => { setMessageId(props.id); console.log(props.id, message); setClickChat(!clickChat)}}>
      <img src={image} alt="" />
    </div>
  ) : (
    <div className="chat-message-text">
      <p className="Sender-Message">{message}</p>
    </div>
  )}
        <div className="chat-message-date-time">
          <div className="date-time">
            <p className="date">
              {new Date(date.toDate()).toLocaleString()}
            </p>
            {sender === auth?.currentUser?.email ? <p className='double-tick'><img src={doubleTick} alt="" /></p> : <p></p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Chatmessage