import React, { useState, useEffect } from "react";
import styles from "./CreateUser.module.css";

const CreateUser = () => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [existingUsers, setExistingUsers] = useState([]);

  const DataBaseUsers =
    "https://databaseusers-7fbfd-default-rtdb.firebaseio.com/";

  useEffect(() => {
    fetch(`${DataBaseUsers}/users.json`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const usersList = Object.values(data);
          setExistingUsers(usersList);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar usuários", error);
      });
  }, []);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value.toLowerCase());
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value.toLowerCase());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateUserName = (name) => {
    const regex = /^[a-z0-9-_.]*$/;
    return regex.test(name) && !/\s/.test(name);
  };

  const validatePassword = (pass) => {
    return pass.length >= 8 && !/\s/.test(pass);
  };

  const isUserNameTaken = (name) => {
    return existingUsers.some((user) => user.userName === name);
  };

  const isEmailTaken = (email) => {
    return existingUsers.some((user) => user.email === email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (!validateUserName(userName)) {
      setMessage(
        "Nome de usuário inválido! Use letras minúsculas, números e sem espaços."
      );
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        "A senha deve ter pelo menos 8 caracteres e não conter espaços."
      );
      setLoading(false);
      return;
    }

    if (isUserNameTaken(userName)) {
      setMessage("O nome de usuário já está em uso.");
      setLoading(false);
      return;
    }

    if (isEmailTaken(email)) {
      setMessage("O email já está em uso.");
      setLoading(false);
      return;
    }

    const user = {
      userName,
      email,
      password,
      score: 0,
    };

    fetch(`${DataBaseUsers}/users.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Usuário criado com sucesso! Vá para o login.");
          setUserName("");
          setEmail("");
          setPassword("");
        } else {
          throw new Error("Erro ao criar o usuário.");
        }
      })
      .catch((error) => {
        setMessage(`Erro ao criar o usuário: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Criar Usuário</h2>
        <section>
          {isLoading && <p>Carregando...</p>}
          {message && <p>{message}</p>}
        </section>
        <div className={styles.formGroup}>
          <label htmlFor="userName">Nome de usuário:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
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
            required
          />
        </div>
        <button
          className={`${styles.submitButton} ${styles.fullWidth}`}
          disabled={isLoading}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
