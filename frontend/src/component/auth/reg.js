import React, { useState } from "react";
import Axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import style from "../../css/reg.module.css";

export const Registration = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/api/auth/login");
  };
  // const toHome = () => {
  //   navigate('/');
  // };

  const { name, email, password } = user;
  const register = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      const status = await response.status;
      console.log(response);

      console.log(status);
      // eslint-disable-next-line default-case
      switch (status) {
        case 201:
          alert("Registered");
          window.location.href = "/api/auth/login";
          break;
      }
    } catch (err) {
      alert("Username or password is already in use");
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
    <div className={style.container}>
      <header>Registration</header>
      <form action="" onSubmit={handleSubmit}>
        <fieldset />
        <div>
          <input
            className={style.regInput}
            type="text"
            name="name"
            id="name"
            value={name}
            required
            onChange={handleChange}
            autoFocus
            placeholder="username"
          />
        </div>
        <div>
          <input
            className={style.regInput}
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={handleChange}
            autoFocus
            placeholder="email"
          />
        </div>
        <div>
          <input
            className={style.regInput}
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
          <button className={style.regBtn} type="submit" onClick={register}>
            Register
          </button>
        </div>
        <div className={style.regLogin}>
          <p>already have an account?</p>
          <button type="submit" onClick={toLogin}>
            <u>log in</u>
          </button>
        </div>
      </form>
    </div>
  );
};
