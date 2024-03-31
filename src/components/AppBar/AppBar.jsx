import React, { useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlinePostAdd } from "react-icons/md";

import Drawer from "../Drawer/Drawer";
import styles from "./AppBar.module.css";

const AppBar = ({ setCurrentPage }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className={styles["app-bar"]}>
        <div className={styles["infos"]}>
          <button
            className={styles["infos"]}
            onClick={() => setCurrentPage("PostsList")}
          >
            <img className={styles["logo"]} src="src\assets\svg-logo.png" />
            <span className={styles["nome"]}>Fórum Gamificado</span>
          </button>
        </div>
        <div className={`${styles["icons"]} ${styles["itens"]}`}>
          <button
            className={styles["item"]}
            onClick={() => setCurrentPage("Login")}
          >
            Login
          </button>
          <button
            className={styles["item"]}
            onClick={() => setCurrentPage("CreateUser")}
          >
            Cadastre-se
          </button>
          <button onClick={() => setCurrentPage("CreatePost")}>
            <MdOutlinePostAdd />
          </button>
          <button onClick={toggleDrawer}>
            <AiOutlineMenu />
          </button>
        </div>
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default AppBar;