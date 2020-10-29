import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import Nav from "./Nav";

const BlogPostForm = () => {
  const [blogPost, setBlogPost] = useState({
    title: "",
    body: "",
  });

  const blogSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/blog/post", blogPost)
      .then((res) => {
        if (res.data.message === "Sucess!") {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  const blogChangeHandler = (e) => {
    setBlogPost({
      ...blogPost,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Container component="main" maxWidth="md">
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <form onSubmit={blogSubmitHandler} noValidate>
              <TextField
                label="Title"
                name="title"
                required
                margin="normal"
                //   fullWidth
                id="title"
                autoFocus
                onChange={blogChangeHandler}
                value={blogPost.title}
              ></TextField>
              <TextField
                multiline
                rows="35"
                rowsMax="100"
                label="Body"
                name="body"
                required
                margin="normal"
                fullWidth
                id="body"
                onChange={blogChangeHandler}
                value={blogPost.body}
              />
              <Button type="submit" variant="contained" color="primary">
                {" "}
                Post Blog{" "}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BlogPostForm;
