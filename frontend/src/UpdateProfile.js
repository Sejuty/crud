import React, { useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

export const UpdateProfile = () => {
  const location = useLocation();
  console.log(location.state);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await Axios.put(
        "http://localhost:3000/api/users/update/password",
        {
          oldPassword,
          newPassword,
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
        case 200:
          window.location.href = "/api/user/profile";
          alert("Password Updated Successfully");
          break;
        case 400:
          alert("Old password incorrect");
          break;
        default:
          alert("ERROR!");
      }
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  // const updateInput = (e) => {
  //   setUpdateProfile({
  //      [e.target.name]: e.target.value
  //     });
  // };

  return (
    <div>
      <div>
        <label htmlFor="oldPassword">Old Password </label>
        <input
          type="text"
          name="oldPassword"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password </label>
        <input
          type="text"
          name="newPassword"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};
