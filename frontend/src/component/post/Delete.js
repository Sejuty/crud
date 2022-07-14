import Axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../../css/post.module.css";
import style2 from "../../css/delete.module.css";
export const Delete = (props) => {
  const myPost = props.myPost;
  const { id, title, body } = myPost;

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
  let navigate = useNavigate();
  const toEdit = () => {
    navigate("/api/user/post/update", { state: { myPost } });
  };

  return (
    <div key={id} className={style.postContainer}>
      <div className={style.postUser}>
        <h2>{title}</h2>
        <div>
          <p>{body}</p>
        </div>
        <div className={style2.btn}>
          <div className={style2.delete}>
            <button onClick={handleDelete}>delete</button>
          </div>
          <div>
            <button onClick={toEdit}>edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
