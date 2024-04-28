import React, { useEffect, useState } from "react";
import styles from "./UpdatePost.module.css";

const DataBaseTopics =
  "https://databasetopics-bbae0-default-rtdb.firebaseio.com";

const UpdatePost = ({ postId, user, onPostUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyWordsText, setKeyWordsText] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${DataBaseTopics}/topics/${postId}.json`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setKeyWordsText(data.keyWords.join(", "));
          setIsOwner(data.userName === user.userName);
        } else {
          console.error("A resposta JSON é nula ou indefinida");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do post:", error);
      }
    };

    fetchPostData();
  }, [postId, user.userName]);

  const handleUpdatePost = (event) => {
    event.preventDefault();

    if (!isOwner) {
      alert("Você não tem permissão para atualizar este post.");
      return;
    }

    const keyWords = keyWordsText
      .split(",")
      .map((kw) => kw.trim())
      .filter((kw) => kw !== "");

    const updatedPostData = {
      title,
      description,
      keyWords,
    };

    fetch(`${DataBaseTopics}/topics/${postId}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPostData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (onPostUpdated) {
          onPostUpdated();
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar o post:", error);
      });
  };

  return (
    <div className={styles.container}>
      <h2>Atualizar Post</h2>
      {isOwner ? (
        <form onSubmit={handleUpdatePost}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setKeyWordsText(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Atualizar Post
          </button>
        </form>
      ) : (
        <p>Você não tem permissão para atualizar este post.</p>
      )}
    </div>
  );
};

export default UpdatePost;
