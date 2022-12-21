import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './componets/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';


function App() {
  return <>
    <Router>
      <div className="container">
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>
}

export default App;
