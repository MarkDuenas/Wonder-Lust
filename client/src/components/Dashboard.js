import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Typography from "@material-ui/core/Typography";
import { Button, Container, Grid } from "@material-ui/core";
import img from "../img/mountains.jpg";
import FeaturedBlog from "./FeaturedBlog";
import RecentBlogPost from "./RecentBlogPost";
import { Link } from "@reach/router";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Success!") {
          setCurrentUser(res.data.results.user);
        }
      })
      .catch((err) => {
        console.log(err.response.data.verified);
      });
  }, []);

  return (
    <div>
      <Container maxWidth="xl">
        <Grid
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "400px",
            width: "100%",
            borderRadius: "15px",
            marginTop: "10px",
            border: "5px solid #81D8D0",
          }}
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle1">
              {" "}
              A traveler's vision and journal..
            </Typography>
            <Typography
              style={{ fontStyle: "italic" }}
              component="div"
              variant="h1"
              color="inherit"
            >
              Travel with me
            </Typography>
            <Button
              component={Link}
              to="/about"
              color={"secondary"}
              variant="text"
            >
              {" "}
              Check me out{" "}
            </Button>
          </Grid>
        </Grid>

        <FeaturedBlog currentUser={currentUser} />
        <RecentBlogPost currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default Dashboard;
