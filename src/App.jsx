import React, { useState, useEffect } from "react";
import AppBar from "./components/AppBar/AppBar";
import Login from "./components/Login/Login";
import CreateUser from "./components/CreateUser/CreateUser";
import CreatePost from "./components/CreatePost/CreatePost";
import UpdatePost from "./components/UpdatePost/UpdatePost";
import PostsList from "./screen/PostsList/PostsList";
import UserProfile from "./screen/UserProfile/UserProfile";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("PostsList");
  const [user, setUser] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);
  const DataBaseTopics =
    "https://databasetopics-bbae0-default-rtdb.firebaseio.com/";

  function convertData(data) {
    const ids = Object.keys(data);
    let posts = Object.values(data);
    return posts.map((post, index) => {
      return {
        id: ids[index],
        ...post,
      };
    });
  }

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentPage("PostsList");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("Login");
  };

  const handleEditPost = (postId) => {
    setPostToEdit(postId);
    setCurrentPage("UpdatePost");
  };

  const handleDeletePost = async (postId) => {
    const confirmation = window.confirm("Você tem certeza que deseja excluir este post?");
    
    if (confirmation) {
      try {
        await fetch(`${DataBaseTopics}/topics/${postId}.json`, {
          method: "DELETE",
        });
        fetchPosts();
      } catch (error) {
        console.error("Erro ao excluir o post:", error);
      }
    }
  };
  

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${DataBaseTopics}/topics.json`);
      const data = await response.json();

      if (data) {
        const convertedPosts = convertData(data);
        setPostsData(convertedPosts);
      } else {
        setPostsData([]);
      }
    } catch (error) {
      console.error("Erro ao buscar os tópicos:", error);
      setPostsData([]);
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
        return <CreateUser onUserCreated={() => setCurrentPage("Login")} />;
      case "CreatePost":
        return (
          <CreatePost
            user={user}
            onPostCreated={() => setCurrentPage("PostsList")}
          />
        );
      case "UpdatePost":
        return postToEdit ? (
          <UpdatePost
            postId={postToEdit}
            user={user}
            onPostUpdated={() => setCurrentPage("PostsList")}
          />
        ) : null;
      case "Profile":
        return (
          <UserProfile user={user} posts={postsData} onDelete={handleDeletePost} onEdit={handleEditPost} />
        );
      default:
        return (
          <PostsList posts={postsData} user={user} onDelete={handleDeletePost} onEdit={handleEditPost} />
        );
    }
  };

  return (
    <main>
      <AppBar
        user={user}
        onLogout={handleLogout}
        setCurrentPage={setCurrentPage}
      />
      {renderPage()}
    </main>
  );
};

export default App;
