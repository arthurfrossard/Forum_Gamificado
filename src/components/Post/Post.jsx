import React, { useState } from "react";
import styles from "./Post.module.css";

const Post = ({ topic, body }) => {
  const [score, setScore] = useState(0);

  const handleUpvote = () => {
    setScore(score + 1);
  };

  const handleDownvote = () => {
    setScore(score - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.topic}>Tópico: {topic}</h2>
      </div>
      <div className={styles.body}>
        <p className={styles.bodyText}>{body}</p>
      </div>
      <div className={styles.footer}>
        <div className={styles.score}>
          <button onClick={handleUpvote} className={styles.voteButton}>
            +
          </button>
          <span className={styles.scoreValue}>{score}</span>
          <button onClick={handleDownvote} className={styles.voteButton}>
            -
          </button>
        </div>
        <div className={styles.interactions}>
          <span className={styles.comment}>Comentários</span>
          <span className={styles.likes}>Curtidas</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
