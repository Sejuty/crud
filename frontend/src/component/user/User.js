import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const User = (props) => {
  const navigate = useNavigate();

  
  const { id, name, email } = props.user;
  const toUserPost = () => {
    navigate("/api/user/post/" + id);
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <button onClick={toUserPost}>post</button>
    </div>
  );
};
