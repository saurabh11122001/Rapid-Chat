import React, { useContext, useEffect, useState } from 'react';
import './changeavtaar.css';
import avatar1 from '../../Assests/1.png';
import avatar2 from '../../Assests/2.png';
import avatar3 from '../../Assests/3.png';
import avatar4 from '../../Assests/4.png';
import avatar5 from '../../Assests/5.png';
import avatar6 from '../../Assests/6.png';
import AppContext from '../../Context/AppContext';
import db from '../../firebase';
import { useParams } from 'react-router-dom';

const Changeavtaar = (props) => {
  const [fade,setFade]=useState(false);
  const [Index,setIndex]=useState('');

  const { avtaar, setAvtaar, isAvtaar, setIsAvtaar ,currentUserPhoto, setCurrentUserPhoto, setNewAvtaar,confirm, setConfirm,avtaarFriends, setAvtaarFriends} = useContext(AppContext);
  const avtaars = [
    {
      image: avatar1
    },
    {
      image: avatar2
    },
    {
      image: avatar3
    },
    {
      image: avatar4
    },
    {
      image: avatar5
    },
    {
      image: avatar6
    },
    {
      image: avatar1
    },
    {
      image: avatar2
    },
    {
      image: avatar3
    },
    {
      image: avatar4
    },
    {
      image: avatar5
    },
    {
      image: props.currentUser.photoURL
    },
  ];
  const handleChange = () => {
    db.collection("users").doc(props.currentUser?.email).update({
      photoURL:avtaar
  })
  .then(() => {
      console.log("updated");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
    // Update the user's photoURL in local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    userData.photoURL = avtaar;
    localStorage.setItem('user', JSON.stringify(userData));
    setNewAvtaar(avtaar);
    setCurrentUserPhoto(true);
    setConfirm(!confirm);
    // window.location.reload();
   
  }

  

  return (
    <>
      <div className="avtaar-container">
        <div className="avtaar-header">
          <p>Avatar</p>
        </div>
          <div className="choose-avtaar">
          <div className="select-avtaar">
          <p>Select Avatar</p>
          </div>
          <div className="all-avatars">
           {avtaars.map((avtr, index) => (
              <div key={index} className='avtaar-img'>
                <img className={`box ${fade && index===Index? 'fade' : ''}`}
                  src={avtr.image}
                  alt=""
                  onClick={() => {
                    setAvtaar(avtr.image);
                    setIsAvtaar(!isAvtaar);
                    setFade(!fade)
                    setIndex(index)
                  }}
                />
              </div>
            ))}
            </div>
            {fade?<div className="okay-btn"onClick={()=>{setConfirm(!confirm)}}>
              OKAY
            </div>:''}
          </div>
          {confirm?<div className="confirm-box">
            <p className="confirm-message">
              Do You Want to Change Your Avatar?
            </p>
           <div className="btn-2">
              <div className="cancle"onClick={()=>{setConfirm(!confirm)}}>Cancle</div>
              <div className="confirm"onClick={handleChange}>Confirm</div>
            </div>
          </div>:''}
        </div>
      
    </>
  );
};

export default Changeavtaar;
