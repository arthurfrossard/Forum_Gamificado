import React, { useEffect, useState } from "react";
import AppBar from "./components/AppBar/AppBar";
import Login from "./components/Login/Login";
import CreateUser from "./components/CreateUser/CreateUser";
import CreatePost from "./components/CreatePost/CreatePost";
import PostsList from "./screen/PostsList/PostsList";
import "./App.css";

const DataBaseTopics = "https://databasetopics-bbae0-default-rtdb.firebaseio.com/";

function App() {
  const [currentPage, setCurrentPage] = useState("PostsList");
  const [user, setUser] = useState(null);
  const [postsData, setPostsData] = useState([]);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentPage("PostsList"); // Redirecionar para a lista de posts após login bem-sucedido
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("Login"); // Redirecionar para login após logout
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${DataBaseTopics}/topics.json`);
      const data = await response.json();

      if (data) {
        const topics = Object.values(data);
        setPostsData(topics);
      }
    } catch (error) {
      console.error("Erro ao buscar os tópicos:", error);
    }
  };

  useEffect(() => {
    if (currentPage === "PostsList") {
      fetchPosts();
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "Login":
        return <Login onLogin={handleLogin} />;
      case "CreateUser":
        return <CreateUser onUserCreated={() => setCurrentPage("Login")} />; // Redirecionar para login após criar usuário
      case "CreatePost":
        return <CreatePost user={user} onPostCreated={() => setCurrentPage("PostsList")} />; // Redirecionar para a lista de posts após criar um post
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
