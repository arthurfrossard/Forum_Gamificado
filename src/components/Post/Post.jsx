import React from "react";
import styles from "./Post.module.css";

const Post = ({
  keyWords = [],
  publicationDate,
  description,
  title,
  userName,
  likes,
  dislikes,
  currentUser,
  onEdit,
  onDelete,
}) => {
  const isCreator = currentUser?.userName === userName;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.publicationDate}>
          Publicado por {userName} em {publicationDate}
        </p>
      </div>
      <div className={styles.body}>
        <p className={styles.description}>{description}</p>
        <p className={styles.keyWords}>
          Palavras-chave:{" "}
          {keyWords.length > 0 ? keyWords.join(", ") : "Nenhuma palavra-chave"}
        </p>
      </div>
      <div className={styles.footer}>
        <div className={styles.interactions}>
          <span className={styles.comment}>Comentários</span>
          <span className={styles.likes}>Curtidas: {likes}</span>
          <span className={styles.dislikes}>Descurtidas: {dislikes}</span>
          {isCreator && (
            <>
              <button className={`${styles.editButton} edit-test`} onClick={onEdit}>
                Editar
              </button>
              <button onClick={onDelete} className="delete-test" >Excluir</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
