import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Link, Routes, Route } from "react-router-dom";
import UserContext from "./context/UserContext.js";
import { useContext } from "react";

import "./App.css";

function App() {
  const { isLoggedIn, handleLogOut,user } = useContext(UserContext);

  return (
   <div>
      <h1 >Expensify App</h1>

     <div>
        <Link to="/" >Home</Link>
</div>
        {isLoggedIn && 
          <div>
            <Link to="/Dashboard">Dashboard</Link><br/>
            <Link to="/Account" >Account  </Link><br/>
            {user.role=="admin"&& <Link to="/users-list">UserList</Link>}<br/>
           
            <button onClick={handleLogOut} >
              Logout
            </button>
          </div>
}
{!isLoggedIn&&
          <div>
            <Link to="/Register">Register</Link> <br/>
            <Link to="/Login">Login</Link>
          </div>
      }
     

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;