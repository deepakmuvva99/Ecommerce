
// import React, { useState, useEffect } from "react";

// import axios from "axios";
// import {Link,useNavigate} from "react-router-dom";
// function Login(props) {

//   const navigate = useNavigate();
  
//   const [userName, setuserName] = useState("");
//   const [password, setPassword] = useState("");


//   async function HandleLogin(e) {
//     e.preventDefault();
//     try{
//         const res = await axios.get("http://127.0.0.1:8000/users/")
//         const res_data = res.data
//         const matched = res_data.find((user)=>
//            user.user_name === userName && user.user_password === password
//         )

//         if(matched){
//           props.setUserLogged(userName);
//           setuserName("");
//           setPassword("");
//           navigate("/products");
//         }
//         else{
//           alert("Invalid Credentials");
//         }
//     }
//     catch(err){
//         console.error(err);
//     }
//   }
//     return (
//       <div>
//         <h1>Login Page</h1>
//         <form onSubmit={HandleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={userName}
//             onChange={(e) => setuserName(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Link to = "/signup">Don't Have an Account ?</Link>
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     );
//   }

// export default Login;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'; // Import the CSS file

function Login(props) {
  const navigate = useNavigate();
  
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  async function HandleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.get("https://ecommerce-backend-7kfm.onrender.com/users/");
      const res_data = res.data;
      const matched = res_data.find((user) =>
        user.user_name === userName && user.user_password === password
      );

      if (matched) {
        props.setUserLogged(userName);
        props.setLoginStatus(true);
        setuserName("");
        setPassword("");
        navigate("/products");
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please sign in to your account</p>
        
        <form className="login-form" onSubmit={HandleLogin}>
          <div className="input-group">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              className="input-field"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button className="login-button" type="submit">
            Sign In
          </button>
          
          <div className="signup-link">
            <Link to="/signup">Don't have an account? Create one</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;