import React from "react";
import Post from "../../components/Post/Post.jsx";
import styles from "./PostsList.module.css";

const PostsList = ({ posts, user, onEdit }) => {
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
              likes={post.like}
              dislikes={post.disliked}
              currentUser={user}
              onEdit={() => onEdit(post.id)} 
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
