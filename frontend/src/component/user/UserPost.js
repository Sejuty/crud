import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

export const UserPost = (props) => {
  const { id } = useParams();

  const [userPost, setUserPost] = useState([]);

  const getUserPost = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:3000/api/user/post/" + id
      );
      const data = await response.data
      setUserPost(data);
      console.log(data)
      
    } catch (err) {
      console.log(err);
    }
  };
 

  useEffect(() => {
    getUserPost();
  }, []);


  return (
    <div>
      <div>
      {userPost.map((post) => (
          <div key={post.id}>
           <h2>{post.title}</h2>
           <p>{post.body}</p>
           <p>{post.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
