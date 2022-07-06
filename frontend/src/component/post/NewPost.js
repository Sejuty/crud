import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyPosts } from "./MyPosts";

export const NewPost = (props) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();
  const { title, body } = post;
  const createPost = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/api/user/post",
        {
          title: title,
          body: body,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      const status = await response.status;
      switch (status) {
        case 201:
          alert("Story created");
          window.location.reload(true);
          break;
          case 401:
            alert("Unauthorized");
            window.location.href = "./api/auth/login";
            break;
        default:
          alert("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // res.headers['x-access-token']
  const handleInput = (e) => {
    const name = e.target.name;
    setPost({ ...post, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    console.log(post);
  };
  return (
    <div>
      new Post
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Description </label>
          <textarea
            type="text"
            name="body"
            id="body"
            onChange={handleInput}
            value={body}
            required
          />
        </div>
        <button type="submit" onClick={createPost}>
          Add Post
        </button>
      </form>
      <MyPosts />
    </div>
  );
};
