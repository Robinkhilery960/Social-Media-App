 import {BrowserRouter as Router, Route,Routes,Navigate} from "react-router-dom"; 
 import PageRender from "./customRouter/pageRender";
 import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Home from "./pages/home.js";
import Alert from "./components/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";
import Header from "./components/header/Header"; 
function App() {
  const {auth}=useSelector(state=>state)
  const dispatch=useDispatch()
  const firstLogin=localStorage.getItem("firstLogin")

useEffect(()=>{
  dispatch(refreshToken())
},[dispatch])
// why dispatch in dependencies array 


  return ( 
    <Router>
      <Alert/>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main"> 
          {/* <Header/> */}
          {auth.token && <Header/>}
          <Routes>  
          <Route path="/" element={auth.token?<Home/>:<Login/>}/>  
          <Route path="/register" element={<Register/>}/>  
          <Route path="/:page" element={firstLogin?<PageRender/>:<Navigate to="/"/>}/>  
          <Route path="/:page/:id" element={firstLogin?<PageRender/>:<Navigate to="/"/>}/>  
          </Routes>
          </div>
      </div> 
      </Router>
  );
}

export default App;
