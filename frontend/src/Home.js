import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AllPosts } from "./component/post/AllPosts";
import style from "./css/home.module.css";
import { Profile } from "./Profile";
import {Nav} from './Nav'
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

 
  return (
    <div>
      <Nav />
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
