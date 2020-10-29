import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const OneBlogView = (props) => {
  const classes = useStyles();

  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/blog/${props.id}`)
      .then((res) => {
        setBlog(res.data.thisBlogPost[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container maxWidth="md">
      <Grid container justify="center" className={classes.grid}>
        <Grid item>
          <Typography variant="h4"> Recent Blog Post </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.blog}>
        <Grid item xs={12}>
          <Typography style={{ fontStyle: "italic" }} variant="h5">
            {blog.title}
          </Typography>
          <Typography variant="subtitle2">
            {" "}
            {new Date(blog.createdAt).toDateString()}{" "}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">{blog.body}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OneBlogView;
