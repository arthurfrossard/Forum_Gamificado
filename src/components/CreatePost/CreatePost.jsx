import React, { useState } from "react";
import styles from "./CreatePost.module.css";

const DataBaseTopics =
  "https://databasetopics-bbae0-default-rtdb.firebaseio.com";

const CreatePost = ({ user, onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyWordsText, setKeyWordsText] = useState("");
  const userName = user.userName;

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleKeyWordsChange = (event) => {
    setKeyWordsText(event.target.value);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  const handleCreatePost = (event) => {
    event.preventDefault();

    const keyWords = keyWordsText
      .split(",")
      .map((kw) => kw.trim())
      .filter((kw) => kw !== "");

    const postData = {
      title,
      description,
      keyWords,
      publicationDate: formatDate(new Date()),
      userName,
      like: 0,
      disliked: 0,
    };

    fetch(`${DataBaseTopics}/topics.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Novo Post Criado:", data);
        setTitle("");
        setDescription("");
        setKeyWordsText("");
        if (onPostCreated) {
          onPostCreated();
        }
      })
      .catch((error) => {
        console.error("Erro ao criar o post:", error);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreatePost}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className={`${styles.input} ${styles.textarea}`}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="keyWords">
            Palavras-Chave (separadas por vírgula):
          </label>
          <input
            type="text"
            id="keyWords"
            value={keyWordsText}
            onChange={handleKeyWordsChange}
            className={styles.input}
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
