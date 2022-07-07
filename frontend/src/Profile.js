import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./css/profile.module.css";
export const Profile = () => {
  const [profile, setProfile] = useState([]);

  const myProfile = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:3000/api/users/profile",
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );

      setProfile(response.data.user);
      console.log(profile);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    myProfile();
  }, []);

  const navigate = useNavigate();
  const editProfile = () => {
    navigate("/api/users/update/password", { state: { profile } });
  };
  return (
    <div className={style.profileContainer}>
      <div className={style.info}>
        <h1> {profile.name}</h1>
        <div>
          <p>email : {profile.email}</p>
        </div>
        <div>
          <button onClick={editProfile}>update</button>
        </div>
      </div>
    </div>
  );
};
