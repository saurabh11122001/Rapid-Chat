// importing react router Dom for navigate from one page to another without loading
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Chatpage from './Components/Chatpage/Chatpage';
import AppState from './Context/AppState';
import Login from './Components/Login/Login';
import Avtaar from './Components/Avtaar/Avtaar';
import { useState} from 'react';
import  { auth } from './firebase';
import Loading from './Components/Loading/Loading';



function App() {

  //state for checking the user is available or not in localstorage
  const[user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
  const [loading,setLoading]=useState(true)
  // /for logging out of app
  const singOut=()=>{
    auth
    .signOut()
    .then(()=>{
      setUser(null);
      localStorage.removeItem("user");
    })
    .catch((err)=>alert(err.message));
  }
setTimeout(() => {
  setLoading(false);
}, 5000);

  return (
  <>
  <AppState>
   <Router>
    <div className="App">
    {user?(<Routes>
    <Route path='/'element={<Home currentUser={user} signOut={singOut}/>}></Route>
    <Route path='/:emailID'element={<Chatpage  currentUser={user} signOut={singOut}/>}></Route>

    <Route path='/avtaar'element={<Avtaar currentUser={user} signOut={singOut}/>}></Route>
    <Route path='/login'element={<Login/>}></Route>
    </Routes>):loading===false?(
      <Login setUser={setUser} currentUser={user}/>
    ):<Loading/>}
    </div>
  </Router>
  </AppState>
  </>
  
  );
}

export default App;
