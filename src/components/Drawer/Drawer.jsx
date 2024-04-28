import React from "react";
import styled, { keyframes } from "styled-components";

import { MdHome } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import { GiArchiveRegister } from "react-icons/gi";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdPrivacyTip } from "react-icons/md";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  height: 100vh;
  width: 300px;
  background-color: #fff;
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: right 0.3s ease-in-out;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;

  transition: color 0.3s ease-in-out;
`;

const DrawerContent = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 1.125rem;
  margin-bottom: 32px;
  color: #757575;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }

  svg {
    font-size: 1.5rem;
    margin-right: 24px;
  }
`;

const Drawer = ({ isOpen, toggleDrawer, setCurrentPage, user, onLogout }) => {
  const handleItemClick = (page) => {
    setCurrentPage(page);
    toggleDrawer();
  };

  return (
    <>
      <DrawerContainer isOpen={isOpen}>
        <DrawerContent>
          <Button onClick={() => handleItemClick("PostsList")}>
            <MdHome />
            Home
          </Button>
          {user ? (
            <>
              <Button onClick={() => handleItemClick("Profile")}>
                <CgProfile />
                Perfil
              </Button>
              <Button onClick={() => handleItemClick("CreatePost")}>
                <MdOutlinePostAdd />
                Postar
              </Button>
              <Button onClick={onLogout}>
                <IoLogOut />
                Logout
              </Button>
              <Button >
              <MdPrivacyTip />
                Politicas de Privacidade
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => handleItemClick("Login")}>
                <IoLogIn />
                Login
              </Button>
              <Button onClick={() => handleItemClick("CreateUser")}>
                <GiArchiveRegister />
                Cadastre-se
              </Button>
            </>
          )}
        </DrawerContent>
      </DrawerContainer>
      {isOpen && <Backdrop onClick={toggleDrawer} />}
    </>
  );
};

export default Drawer;
