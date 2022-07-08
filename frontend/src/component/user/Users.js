import Axios from "axios";
import React, { useState, useEffect } from "react";
import { User } from "./User";
import style from "../../css/home.module.css";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);

  try {
    const getUsers = async () => {
      const response = await Axios.get("http://localhost:3000/api/users/all");

      const data = await response.data;
      setUsers(data);
    };
    useEffect(() => {
      getUsers();
    }, []);
  } catch (err) {
    console.log(err);
  }
  const navigate = useNavigate();
  const toLogin = () => {
    localStorage.setItem("x-access-token", "");
    localStorage.setItem("userID", "");
    navigate("/api/auth/login");
  };
  const toPost = () => {
    navigate("/api/user/post");
  };
  const toHome = () => {
    navigate("/");
  };
 

  return (
    <div>
      <div className={style.topnav}>
        <div className={style.navLink}>
          <button onClick={toPost}>post</button>
          <button onClick={toHome}>home</button>
          <button onClick={toLogin}>logout</button>
        </div>
      </div>
      <div>
        {users.map((user) => {
          const myProfile = parseInt(localStorage.getItem("userID"));
          if (myProfile !== user.id) {
            return <User user={user} key={user.id} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};
