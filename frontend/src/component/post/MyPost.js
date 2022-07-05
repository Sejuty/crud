import Axios from "axios";
import React, { useEffect } from "react";

export const MyPost = (props) => {
  const myPost = props.myPost;
  const { id, title, body } = myPost;
  console.log(myPost);

  const handleDelete = async () => {
    try {
      const response = await Axios.delete(
        "http://localhost:3000/api/user/post/delete/" + id,
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      const status = await response.status;
      switch (status) {
        case 201:
          alert("Story Deleted");
          window.location.reload(true);
          break;
        default:
          alert("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={id}>
      <h1>{title}</h1>
      <p>{body}</p>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};
