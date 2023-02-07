import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => userName.length > 0 && password.length > 0;

  const handleSubmit = async event => {
    event.preventDefault();
    const user = { userName, password };
    
    try {
      await axios.post("http://localhost:3010/api/user/login", user);
      navigate('/chat');

    } catch (error) {
      console.error(error.response.data.message || error);
    }
  };

  return (
    <div style={{ margin: 50, paddingTop: 100, paddingLeft:500, paddingRight:500 }}>
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Username"
            name="username"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <br/>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <br/>
        <button className="btn btn-primary" type="submit" disabled={!validateForm()}>
          Login
        </button>
        <br />
        <br />
        <span>
          Don't have an account? <Link to="/register">Create One</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
