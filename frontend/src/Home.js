import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AllPosts } from "./component/post/AllPosts";
import { NewPost } from "./component/post/NewPost";
import Axios from "axios";

export const Home = () => {
  
  const [posts, setPosts] = useState([])

	async function getStories(){
		const response = await fetch('http://localhost:3000/api/user/post/all', {
			method: 'GET',
		})
		const data = await response.json();
		setPosts(data)
	}

	useEffect(() => {
    	getStories()
	}, [])

  const navigate = useNavigate();

  const toRegister = () => {
    navigate("/api/auth/register");
  };
  const toProfile = () => {
    navigate("api/user/profile");
  };
  const toPost = () => {
    navigate("api/user/post");
  };
  
  return (
    <div>
      Home
      {/* <NewPost onAddPost = {handleNewPost} /> */}
      <AllPosts posts={posts} />
      <div>
        <button onClick={toRegister}>register</button>
      </div>
      <div>
        <button onClick={toPost} >Post</button>
      </div>
      <div>
        <button onClick={toProfile} >Profile</button>
      </div>
    </div>
  );
};
