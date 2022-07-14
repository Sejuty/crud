import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
//import style from"../../css/reg.module.css"
import style2 from"../../css/login.module.css"

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const { email, password } = user;

  const navigate = useNavigate();
  const register = ()=>{
    navigate("/api/auth/register")
  }

  const login = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      const status = await response.status;

      // eslint-disable-next-line default-case
      switch (status) {
        case 200:
          console.log(response.data.user.id);
          localStorage.setItem("x-access-token", response.data.token);
          localStorage.setItem("userID", response.data.user.id);
          window.location.href = "/";
          break;
        case 401:
          alert("Username or password is incorrect");
      }
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
    <div className={style2.container}>
      <header>Log in</header>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={handleChange}
            placeholder="email"
            autoFocus
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={handleChange}
            autoFocus
            placeholder="password"
          />
        </div>
        <div>
          <button className={style2.logBtn} type="submit" onClick={login}>
            Login
          </button>
          <button className={style2.logBtn} type="submit" onClick={register}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
