import React from "react";
import {Post} from "../post/Post";

export const AllPosts = (props) => {
    console.log(props.posts)

  return (
    <div>
      <section>
        {props.posts.map((post) => (
          <Post post={post} key = {post.id}/>
        ))}
      </section>
    </div>
  );
};
