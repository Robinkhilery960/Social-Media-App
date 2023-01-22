 import {BrowserRouter as Router, Route,Routes} from "react-router-dom"; 
 import PageRender from "./pageRender.js";
 import Login from "./pages/login.js";
import Register from "./pages/register.js";

function App() {
  return ( 
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <h1>Hello client </h1>
          <Routes>  
          <Route path="/:page" element={<PageRender/>}/>  
          <Route path="/:page/:id" element={<PageRender/>}/>  
          </Routes>
          </div>
      </div> 
      </Router>
  );
}

export default App;
