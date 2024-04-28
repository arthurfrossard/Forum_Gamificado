import React, { useEffect, useState } from "react";
import PostsList from "../PostsList/PostsList";
import styles from "./UserProfile.module.css";

const UserProfile = ({ user, posts, onEdit}) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (posts && user) {
      const filteredPosts = posts.filter((post) => post.userName === user.userName);
      setUserPosts(filteredPosts);
    }
  }, [posts, user]);

  return (
    <div className={styles["profile-container"]}>
      <h1>Perfil de {user.userName}</h1>
      <p>Email: {user.email}</p>
      <p>Pontuação: {user.score}</p>
      
      <h2>Posts Publicados:</h2>
      {userPosts.length ? (
        <PostsList posts={userPosts} user={user} onEdit={onEdit}/> 
      ) : (
        <p>Nenhum post publicado pelo usuário.</p>
      )}
    </div>
  );
};

export default UserProfile;
