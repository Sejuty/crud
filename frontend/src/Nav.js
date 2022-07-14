import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./css/nav.module.css";
export const Nav = () => {
  const navigate = useNavigate();

  const toLogin = () => {
    localStorage.setItem("x-access-token", "");
    localStorage.setItem("userID", "");
    navigate("/api/auth/login");
  };

  const toPost = () => {
    navigate("/api/user/post");
  };
  const toUsers = () => {
    navigate("/api/users/all");
  };
  const toHome = () => {
    navigate("/");
  };

  return (
    <div className={style.topnav}>
      <div className={style.navLink}>
        <button onClick={toHome}>home</button>
        <button onClick={toPost}>post</button>
        <button onClick={toUsers}>users</button>
        <button onClick={toLogin}>logout</button>
      </div>
    </div>
  );
};
