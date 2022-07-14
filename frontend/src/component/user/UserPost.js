import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import style from "../../css/post.module.css";
import { Nav } from "../../Nav";

export const UserPost = (props) => {
  const { id } = useParams();

  const [userPost, setUserPost] = useState([]);

  const getUserPost = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:3000/api/user/post/" + id
      );
      const data = await response.data;
      setUserPost(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <div>
      <Nav />
      <div className={style.userpost}>
        {userPost.map((post) => (
          <div key={post.id} className={style.postContainer}>
            <div className={style.postUser}>
              <div>
                <h2>{post.title}</h2>
              </div>
              <div>
                <p>{post.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
