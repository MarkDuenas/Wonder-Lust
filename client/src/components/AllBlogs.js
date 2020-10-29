import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  grid: {
    marginTop: 40,
    borderRadius: 15,
    marginBottom: 40,
    border: "5px solid #81D8D0",
  },
  blog: {
    margin: 20,
    // border: "2px solid #81D8D0",
    backgroundColor: "#F6F2EF",
    borderRadius: 10,
    boxShadow: "5px 10px #81D8D0",
    padding: 10,
  },
});

const AllBlogs = () => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState({});
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Success!") {
          setCurrentUser(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err.response.data.verified);
        if (!err.response.data.verified) {
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blogs")
      .then((res) => {
        let allBlogs = res.data.results;
        allBlogs.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setRecentBlogs(allBlogs);
      })
      .catch((err) => console.log(err.response));
  }, [deleted]);

  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:8000/api/blog/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        deleted ? setDeleted(false) : setDeleted(true);
      })
      .catch((err) => console.log(err));
  };

  const addToFeatured = (blog) => {
    console.log(currentUser);
    axios
      .put(
        `http://localhost:8000/api/user/featuredblogs/${currentUser._id}`,
        blog,
        { withCredentials: true }
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Container maxWidth="md">
        <Grid container justify="center" className={classes.grid}>
          <Grid item>
            <Typography variant="h4"> Recent Blog Post </Typography>
          </Grid>
        </Grid>
        {recentBlogs.slice(0, 3).map((blog, index) => (
          <Grid key={index} container className={classes.blog}>
            <Grid item xs={12}>
              <Typography style={{ fontStyle: "italic" }} variant="h5">
                {blog.title}
              </Typography>
              {currentUser ? (
                <Button color="secondary" onClick={() => deleteBlog(blog._id)}>
                  {" "}
                  Delete Blog{" "}
                </Button>
              ) : (
                ""
              )}
              {currentUser ? (
                <Button color="primary" onClick={() => addToFeatured(blog)}>
                  {" "}
                  Add to Featured Blogs{" "}
                </Button>
              ) : (
                ""
              )}

              <Typography variant="subtitle2">
                {" "}
                {new Date(blog.createdAt).toDateString()}{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{blog.body}</Typography>
            </Grid>
          </Grid>
        ))}
      </Container>
    </div>
  );
};

export default AllBlogs;
