import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleClickHome = () => {
      window.location.href = "/";
    };

  return (
    <div className="Container">
      <div className="loginContainer">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="Input"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="Input"
        />
        <div className="buttonCon">
            <button disabled={loading} onClick={handleClick} className="Button">
              Login
            </button>
            <button onClick={handleClickHome} className="Button">Return To Home</button>
        </div>
        {error && <span>{error.message}</span>}
        <p className="textMargin">New User? Create Account <Link to="/register"> Here.</Link></p>
      </div>
    </div>
  );
};

export default Login;