import React from "react";
import {Post} from "../post/Post";

export const AllPosts = (props) => {
    console.log(props.posts)
    const mystyle = {
        marginTop: "80px"
    };

  return (
    <div style={mystyle}>
      <section>
        {props.posts.map((post) => (
          <Post post={post} key = {post.id}/>
        ))}
      </section>
    </div>
  );
};
