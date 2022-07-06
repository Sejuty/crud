import React, { useState } from "react";
import Axios from "axios"
import {Routes, Route, useNavigate} from 'react-router-dom';


export const Registration = () => {
const [user, setUser] = useState({ name: "", email: "", password: "" });
const navigate = useNavigate();
const toLogin = () => {
  navigate('/api/auth/login');
};
// const toHome = () => {
//   navigate('/');
// };

const { name, email, password } = user;
const register = async()=>{
  try{
   const response =  await Axios.post("http://localhost:3000/api/auth/register",{
      name:name,
      email:email,
      password:password
    })
    const status = await response.status;
    console.log(response)

    // eslint-disable-next-line default-case
    switch (status) {
      case 201:
        window.location.href = "/api/auth/login";
        break;
      case 400:
        alert("Username or password is incorrect");
    }
  }
  catch(err){
    console.log(err)
  }

}
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
      <h1>Registration</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            required
            onChange={handleChange}
          />
        </div>
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
          <button type="submit" onClick={register}>Register</button>
        </div>
        <div>
          <button type="submit" onClick={toLogin}>login</button>
        </div>
      </form>
    </div>
  );
};
