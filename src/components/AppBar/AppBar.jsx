// AppBar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlinePostAdd } from "react-icons/md";
import Drawer from "../Drawer/Drawer";
import styles from "./AppBar.module.css";

const AppBar = ({ user, onLogout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className={styles["app-bar"]}>
        <div className={styles["infos"]}>
          <Link to="/" className={styles["infos"]}>
            <img className={styles["logo"]} src="src/assets/svg-logo.png" />
            <span className={styles["nome"]}>Fórum Gamificado</span>
          </Link>
        </div>
        <div className={`${styles["icons"]} ${styles["itens"]}`}>
          {user ? (
            <>
              <Link to="/" className={styles["item"]}>
                Home
              </Link>
              <button className={styles["item"]} onClick={onLogout}>
                Logout
              </button>
              <Link to="/create-post" className={styles["item"]}>
                <MdOutlinePostAdd />
              </Link>
              <Link to="/profile" className={styles["item"]}>
                Meu Perfil
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={styles["item"]}>
                Login
              </Link>
              <Link to="/create-user" className={styles["item"]}>
                Cadastre-se
              </Link>
            </>
          )}
          <button onClick={toggleDrawer}>
            <AiOutlineMenu />
          </button>
        </div>
      </div>
      <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} user={user} onLogout={onLogout} />
    </>
  );
};

export default AppBar;
