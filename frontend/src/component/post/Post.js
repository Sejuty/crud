import React from "react";
import style from "../../css/post.module.css";

export const Post = (props) => {
  const { title, body, user} = props.post;
  console.log(props.post);
  console.log(user.name);

  return (
    <div className={style.postContainer}>
      <div className={style.postUser}>
      <h4>{user.name}</h4>
      </div>
      <div>
        <h2>{title}</h2>
      </div>
      <div>
        <p>{body}</p>
      </div>
    </div>
  );
};
