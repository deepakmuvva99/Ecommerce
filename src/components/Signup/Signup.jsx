// import React, { useState, useEffect } from "react";
// // import { getBooks, AddBook, DeleteBook, UpdateBook } from "./api";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// function Signup(props) {

//   const navigate = useNavigate();

//   const [userName, setuserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [email,setEmail] = useState("");


//   async function HandleSignup(e) {
//     e.preventDefault();
  
//     const newUser = {
//       user_name : userName,
//       user_password : password,
//       user_email : email
//     }
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/users/", newUser)
//       const res_data = res.data;
//       setuserName("");
//       setPassword("");
//       navigate("/");

//     }
//     catch (err) {
//       console.error(err);
//     }
//   }
//     return (
//       <div>
//         <h1>Signup Page</h1>
//         <form onSubmit={HandleSignup}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={userName}
//             onChange={(e) => setuserName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Link to="/">Have an Account ?</Link>
//           <button type="submit">Sign up</button>
//         </form>
//       </div>
//     );
  

// }

// export default Signup;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css'; // Import the CSS file

function Signup(props) {
  const navigate = useNavigate();

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function HandleSignup(e) {
    e.preventDefault();

    const newUser = {
      user_name: userName,
      user_password: password,
      user_email: email
    };
    
    try {
      const res = await axios.post("https://ecommerce-backend-7kfm.onrender.com/users/", newUser);
      const res_data = res.data;
      setuserName("");
      setPassword("");
      setEmail("");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join us today and get started</p>
        
        <form className="signup-form" onSubmit={HandleSignup}>
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
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          
          <button className="signup-button" type="submit">
            Create Account
          </button>
          
          <div className="login-link">
            <Link to="/">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

