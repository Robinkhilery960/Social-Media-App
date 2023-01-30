 import {BrowserRouter as Router, Route,Routes} from "react-router-dom"; 
 import PageRender from "./customRouter/pageRender";
 import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Home from "./pages/home.js";
import Alert from "./components/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";
import Header from "./components/Header";
function App() {
  const {auth}=useSelector(state=>state)
  const dispatch=useDispatch()

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
          <h1>Hello client </h1>
          <Routes>  
            {auth.token && <Header/>}
          <Route path="/" element={auth.token?<Home/>:<Login/>}/>  
          <Route path="/:page" element={<PageRender/>}/>  
          <Route path="/:page/:id" element={<PageRender/>}/>  
          </Routes>
          </div>
      </div> 
      </Router>
  );
}

export default App;
