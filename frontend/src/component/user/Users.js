import Axios from "axios";
import React, { useState, useEffect } from "react";
import { User } from "./User";
import {Nav} from "../../Nav"

export const Users = () => {
  const [users, setUsers] = useState([]);

  try {
    const getUsers = async () => {
      const response = await Axios.get("http://localhost:3000/api/users/all");

      const data = await response.data;
      setUsers(data);
    };
    useEffect(() => {
      getUsers();
    }, []);
  } catch (err) {
    console.log(err);
  }


  return (
    <div>
      <Nav />
      <div>
        {users.map((user) => {
          const myProfile = parseInt(localStorage.getItem("userID"));
          if (myProfile !== user.id) {
            return <User user={user} key={user.id} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};
