import React, { useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

export const UpdatePost = (props) => {
  const location = useLocation();

  //   console.log(location.pathname);
  //   console.log(location.state);

  const { id, title, body } = location.state.myPost;
  const [updatePost, setUpdatePost] = useState({ title, body });

  //   const [titleVal, setTitleVal] = useState(title);
  //   const [bodyVal, setBodyVal] = useState(body);

  console.log(location.state.myPost);

  const handleUpdate = async () => {
    try {
      const response = await Axios.put(
        "http://localhost:3000/api/user/post/update",
        {
          id: id,
          title: updatePost.title,
          body: updatePost.body,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      const status = response.status;

      // eslint-disable-next-line default-case
      switch (status) {
        case 201:
          console.log(response.data);
          window.location.href = "/api/user/post";
          alert("Post Updated Successfully");
          break;
        case 401:
          alert("You are not authorized");
          break;
        default:
          alert("ERROR!");
      }
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  const updateInput = (e) => {
    setUpdatePost({ [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div>
        <label htmlFor="title">Title </label>
        <input
          type="text"
          name="title"
          id="title"
          value={updatePost.title}
          onChange={updateInput}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Description </label>
        <input
          type="text"
          name="body"
          id="body"
          value={updatePost.body}
          onChange={updateInput}
          required
        />
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};
