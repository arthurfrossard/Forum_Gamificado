import React, { useState } from "react";
import styles from "./CreateUser.module.css";
import { useNavigate } from "react-router-dom";

const DataBaseUsers =
  "https://databaseusers-7fbfd-default-rtdb.firebaseio.com/";

const CreateUser = ({ onUserCreated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${DataBaseUsers}/users.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userName }),
      });
      if (onUserCreated) {
        onUserCreated();
      }
      navigate('/login');
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="userName">Nome de Usuário:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleUserNameChange}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Criar Conta
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
