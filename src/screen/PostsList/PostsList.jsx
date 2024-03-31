import React from "react";
import Post from "../../components/Post/Post.jsx";
import styles from "./PostsList.module.css";

const PostsList = ({ posts }) => {
  return (
    <div className={styles.postsContainer}>
      <div className={styles.posts}>
        {posts.map((post, index) => (
          <Post key={index} topic={post.topic} body={post.body} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
