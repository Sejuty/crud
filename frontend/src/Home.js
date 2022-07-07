import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AllPosts } from "./component/post/AllPosts";
import style from "./css/home.module.css";
import { Profile } from "./Profile";
export const Home = () => {
  const [posts, setPosts] = useState([]);

  async function getStories() {
    const response = await fetch("http://localhost:3000/api/user/post/all", {
      method: "GET",
    });
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    getStories();
  }, []);

  const navigate = useNavigate();

  const toLogin = () => {
    localStorage.setItem("x-access-token", "");
    localStorage.setItem("userID", "");
    navigate("/api/auth/login");
  };
  const toProfile = () => {
    navigate("api/user/profile");
  };
  const toPost = () => {
    navigate("api/user/post");
  };
  const toUsers = () => {
    navigate("/api/users/all");
  };

  return (
    <div>
      <div className={style.topnav}>
        <div className={style.navLink}>
          <button onClick={toPost}>post</button>
          <button onClick={toUsers}>users</button>
          <button onClick={toLogin}>logout</button>
        </div>
      </div>
      <div>
        <div className={style.homeProfile}>
          <Profile />
        </div>
        <div className={style.homePost}>
          <AllPosts posts={posts} />
        </div>
      </div>
    </div>
  );
};
