import axios from "axios";
import {useState } from "react";
import{Link} from "react-router-dom";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    password: "",
    isAdmin: false,
    isVIP: false,
  });

  const [registerSuccess, setRegisterSuccess] = useState(null);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", credentials);
      console.log(res.data);
      setRegisterSuccess(true);
    } catch (err) {
      setRegisterSuccess(false);
    }
  };

  const handleClickHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="Container">
      <div className="lContainer">
        <h1>Register</h1>
        <label for="username">Username:</label>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="Register_Input"
        />
        <label for="email">Email:</label>
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="Register_Input"
        />
        <label for="country">Country:</label>
        <input
          type="text"
          placeholder="country"
          id="country"
          onChange={handleChange}
          className="Register_Input"
        />
        <label for="city">City:</label>
        <input
          type="text"
          placeholder="city"
          id="city"
          onChange={handleChange}
          className="Register_Input"
        />
        <label for="phone">Phone:</label>
        <input
          type="text"
          placeholder="phone"
          id="phone"
          onChange={handleChange}
          className="Register_Input"
        />
        <label for="password">Password:</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="Register_Input"
        />
        <div className="buttonCon">
            <button onClick={handleClick} className="Button">
              Register
            </button>
           <button onClick={handleClickHome} className="Button">
                     Return To Home
           </button>
        </div>
        {registerSuccess === true && (
            <p style={{ color: "green" }}>Registration successful. Please <Link to="/login"> login.</Link></p>)}
        {registerSuccess === false && (<p style={{ color: "red" }}>Registration failed. Please make sure all required information are provided.</p>)}
      </div>
    </div>
  );
};

export default Register;
