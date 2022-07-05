import React, { useState, useEffect } from "react";
import Axios from "axios";

export const Profile = () => {
  const [profile,setProfile] = useState([{name : "",email:""}]);

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
      
      setProfile(response.data.user)
      console.log(profile);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    myProfile();
  }, []);
  console.log(profile)
  return <div>
    <h1> {profile.name}</h1>
    <p>{profile.email}</p>
  </div>;
};
