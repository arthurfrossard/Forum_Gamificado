import React from "react";
import Post from "../../components/Post/Post.jsx";
import styles from "./PostsList.module.css";

const PostsList = ({ posts, user, onEdit, onDelete }) => {
  return (
    <div className={styles.postsContainer}>
      {posts ? (
        <div className={styles.posts}>
          {posts.map((post) => (
            <Post
              key={post.id}
              keyWords={post.keyWords}
              publicationDate={post.publicationDate}
              description={post.description}
              title={post.title}
              userName={post.userName}
              likes={post.likes}
              dislikes={post.dislikes}
              currentUser={user}
              onEdit={() => onEdit(post.id)}
              onDelete={() => onDelete(post.id)}
            />
          ))}
        </div>
      ) : (
        <p>Não há posts para exibir.</p>
      )}
    </div>
  );
};

export default PostsList;
