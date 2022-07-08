import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Delete } from "./Delete";
import { UpdatePost } from "./UpdatePost";

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
      const status = response.status;
      setMyPosts(response.data);
      console.log(response.data);
      // eslint-disable-next-line default-case
      switch (status) {
        case 401:
          alert("Unauthorized!");
          break;
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getMyPosts();
  }, []);

  const myStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <div style={myStyle}>
      {myPosts.map((post) => (
        <div key={post.id}>
          <Delete myPost={post} />
        </div>
      ))}
    </div>
  );
};
