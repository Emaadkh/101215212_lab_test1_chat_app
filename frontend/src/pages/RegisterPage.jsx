import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    const user = { username, firstname, lastname, password };
    try {
      const response = await axios.post('http://localhost:3010/api/user/signup', user);
      console.log(response);
      navigate('/login');
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <div style={{ margin: 50, paddingTop: 100, paddingLeft: 500, paddingRight: 500 }}>
      <form onSubmit={handleSubmit}>
        <h2>Register Form</h2>
        <br />
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
                required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
