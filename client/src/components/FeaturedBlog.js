import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@material-ui/core";
import cardimg from "../img/deer.jpg";
import axios from "axios";
import { Link } from "@reach/router";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  featured: {
    marginTop: 40,
  },
  grid: {
    borderRadius: 15,
    marginBottom: 40,
    border: "5px solid #81D8D0",
  },
});

const FeaturedBlog = (props) => {
  const classes = useStyles();

  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Success!") {
          setFeaturedBlogs(res.data.results.user.featuredPost);
        }
      })
      .catch((err) => {
        console.log(err.response.data.verified);
      });
  }, []);

  return (
    <Container maxWidth="lg" className={classes.featured}>
      <Grid container justify="center" className={classes.grid}>
        <Typography variant="h4" color="textPrimary">
          {" "}
          Featured Blog Post
        </Typography>
      </Grid>
      <Grid container spacing={2} justify="center" alignContent="center">
        {featuredBlogs.map((blog, index) => (
          <Grid key={index} item lg={3} md={6} xs={12}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={cardimg}
                  title={blog.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {blog.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  component={Link}
                  to={`/blog/${blog._id}`}
                  size="small"
                  color="primary"
                >
                  {" "}
                  Learn More{" "}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedBlog;
