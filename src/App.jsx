// App.js

import React, { useState } from "react";
import AppBar from "./components/AppBar/AppBar";
import Login from "./components/Login/Login";
import CreateUser from "./components/CreateUser/CreateUser";
import CreatePost from "./components/CreatePost/CreatePost";
import PostsList from "./screen/PostsList/PostsList";
import postsData from "./data/dataPosts.json";

import "./App.css";

const DataBaseUsers = "https://databaseusers-7fbfd-default-rtdb.firebaseio.com/";

function App() {
  const [currentPage, setCurrentPage] = useState("PostsList");
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Login":
        return <Login onLogin={handleLogin} />;
      case "CreateUser":
        return <CreateUser />;
      case "CreatePost":
        return <CreatePost />;
      default:
        return <PostsList posts={postsData} />;
    }
  };

  return (
    <main>
      <AppBar user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </main>
  );
}

export default App;
