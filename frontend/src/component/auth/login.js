import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const { email, password } = user;

  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };

  const login = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response);

      // eslint-disable-next-line default-case
      console.log(response.data.user.id);
      localStorage.setItem("x-access-token", response.data.token);
      localStorage.setItem("userID", response.data.user.id);
      toHome()
    } catch (err) {
      alert("Error!!!");
    }
  };

  const handleSubmit = (e) => {
    console.log("Submitted");
    e.preventDefault();
  };
  const handleChange = (e) => {
    const fieldName = e.target.name;
    setUser({ ...user, [fieldName]: e.target.value });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" onClick={login}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
