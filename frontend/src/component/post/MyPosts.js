import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { MyPost } from "./MyPost";

export const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);

  async function getMyPosts() {
    try {
      const response = await Axios.get(
        "http://localhost:3000/api/user/post/my/all",
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      setMyPosts(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div>
      {myPosts.map((post,index) => (
        <MyPost myPost={post} key={post.id}/>
      ))}
    </div>
  );
};
