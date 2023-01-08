import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './componets/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import NewTicket from './pages/NewTicket';

import {useState} from "react";
import PrivateRoute from './componets/PrivateRoute';


function App() {
  const [user,setUser] = useState();
  const setUserStatus = (obj)=>{
    setUser({...obj});
  }

  return <>
    <Router>
      <div className="container">
        <Header/>
        <Routes>
          <Route path='/' element={<Home user={user}/>} />
          <Route path='/login' element={<Login setUser = {setUserStatus}/>} />
          <Route path='/register' element={<Register setUser={setUserStatus}/>} />
          <Route path='/new-ticket' element={<PrivateRoute/>} >
            <Route path='/new-ticket' element={<NewTicket/>}></Route>
          </Route>
        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>
}

export default App;
