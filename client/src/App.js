import { Router } from "@reach/router";
import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import LoginRegForm from "./components/LoginRegForm";
import BlogPostForm from "./components/BlogPostForm";
import Logout from "./components/Logout";
import AllBlogs from "./components/AllBlogs";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import OneBlogView from "./components/OneBlogView";

function App() {
  return (
    <div className="App">
      <Nav />
      <Router>
        <LoginRegForm path="/" />
        <Dashboard path="/dashboard" />
        <BlogPostForm path="/blogpost" />
        <Logout path="/logout" />
        <AllBlogs path="/allblogs" />
        <AboutMe path="/about" />
        <OneBlogView path="/blog/:id" />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
