import React, { useState } from "react";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleCreatePost = (event) => {
    event.preventDefault();
    const postData = {
      topic,
      body,
    };
    console.log("Novo Post:", postData);
    // Aqui você pode fazer algo com os dados do post, como enviar para um servidor
    setTopic("");
    setBody("");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreatePost}>
        <div className={styles.formGroup}>
          <label htmlFor="topic">Tópico:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={handleTopicChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="body">Corpo do Post:</label>
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            className={`${styles.input} ${styles.textarea}`}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Criar Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
