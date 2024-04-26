import React, { useState } from "react";
import styles from "./Login.module.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const DataBaseUsers =
    "https://databaseusers-7fbfd-default-rtdb.firebaseio.com/";

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${DataBaseUsers}/users.json`);
      const data = await response.json();
      const usersList = Object.values(data);

      // Verificar se o email existe
      const foundUser = usersList.find((user) => user.email === email);

      if (!foundUser) {
        // Se o email não for encontrado
        setError("Email não encontrado");
      } else if (foundUser.password !== password) {
        // Se o email for encontrado, mas a senha não corresponde
        setError("Senha incorreta");
      } else {
        // Se email e senha estiverem corretos
        onLogin(foundUser);
        setError(""); // Limpar erro se o login for bem-sucedido
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login. Tente novamente mais tarde.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
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
           svalue={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          type="submit"
          className={`${styles.submitButton} ${styles.fullWidth}`}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
