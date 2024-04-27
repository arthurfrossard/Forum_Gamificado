import React from "react";
import Post from "../../components/Post/Post.jsx";
import styles from "./PostsList.module.css";

const PostsList = ({ posts }) => {
  return (
    <div className={styles.postsContainer}>
      <div className={styles.posts}>
        {posts.map((post, index) => (
          <Post
            key={index}
            keyWords={post.keyWords}
            publicationDate={post.publicationDate}
            description={post.description}
            title={post.title}
            userName={post.userName}
            likes={post.like}
            dislikes={post.disliked}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
