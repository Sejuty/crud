import React, { useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import style from "./css/login.module.css";

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
          window.location.href = "/";
          alert("Password Updated Successfully");
          break;
        case 400:
          alert("Old password incorrect");
          break;
        default:
          alert("ERROR!");
      }
    } catch (err) {
      const status = err.response.status;
      switch (status) {
        case 400:
          alert("Old password incorrect");
          break;
        default:
          alert("ERROR!");
      }
    }
  };

  return (
    <div className={style.recontainer}>
      <div className={style.container}>
        <div>
          <input
            type="text"
            name="oldPassword"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            placeholder="Old Password"
          />
        </div>
        <div>
          <input
            type="text"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="New Password"
          />
        </div>
        <button onClick={handleUpdate} className={style.logBtn}>
          Update
        </button>
      </div>
    </div>
  );
};
