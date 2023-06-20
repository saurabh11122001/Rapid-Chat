import AppContext from "./AppContext";
import { useState } from "react";

const AppState = (props) => {
  //state for writing message on Input 
  const [msg,setMessage]=useState('');
  //state for toggling more options in Chatmessage area
  const [popupClass,setPopupClass]=useState(false);
  //state for toggling sidebar area three dots
  const [popupClass2,setPopupClass2]=useState(false);
  //for saving email from params
  const [email,setEmail]=useState('');
//for sidebar dp open
  const [dp,setDp]=useState(false);
  //for setting the image url in varaibale when clicked on image
  const [dpImg,setDpImg]=useState('');
  //for to open emoji div
  const [emoji,setEmoji]=useState(false);
//fetching users to store in this array
  const [allUsers,setAllUsers]=useState([])
  //setting state for search input in sidebar
  const [searchInput,setSearchInput]=useState('');
  //for setting user detials in chat section
  const [chatUser,setChatUser]=useState({});
// //storing value length of search input to if 0 then navigate home 
//   const[searches,setSearches]=useState(0);
const [showmessages,setshowMessages]=useState([]);
// recent friends
const [friendsList,setFriendsList]=useState([]);
const [dot,setDot]=useState(false);
const [check,setCheck]=useState({});
const [allContacts,setAllContacts]=useState([]);
const [recent,setRecent]=useState(false);
const [allContactsTitle,setAllContactsTitle]=useState(false);
const [searchTitle,setSearchTitle]=useState(false);
const [selectPhoto,setSelectPhoto]=useState(false);
const [avtaar,setAvtaar]=useState('');
const [isAvtaar,setIsAvtaar]=useState(false);
const [newAvtaar, setNewAvtaar] = useState('');
const [currentUserPhoto, setCurrentUserPhoto] = useState(false);
const [confirm, setConfirm] = useState(false);
const [avtaarFriends, setAvtaarFriends] = useState('');



    return (
        <AppContext.Provider value={{msg,setMessage,
          popupClass,setPopupClass,
          emoji,setEmoji,
          allUsers,setAllUsers,
          searchInput,setSearchInput,
          chatUser,setChatUser,
          email,setEmail,
          popupClass2,setPopupClass2,
          dp,setDp,
          dpImg,setDpImg,
          showmessages,setshowMessages,
          friendsList,setFriendsList,
          dot,setDot,check,setCheck,
          allContacts,setAllContacts,
          allContactsTitle,setAllContactsTitle,
          recent,setRecent,searchTitle,setSearchTitle,
          selectPhoto,setSelectPhoto,avtaar,setAvtaar,isAvtaar,setIsAvtaar,
          newAvtaar, setNewAvtaar,currentUserPhoto, setCurrentUserPhoto,confirm, setConfirm,
          avtaarFriends, setAvtaarFriends
          }}>
          {props.children}
        </AppContext.Provider>
      )

}
 
  





export default AppState;