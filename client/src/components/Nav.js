import React, { useState, useEffect } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { Link } from "@reach/router";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import axios from "axios";

const Nav = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Success!") {
          setAuth(true);
        }
      })
      .catch((err) => {
        setAuth(false);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#81D8D0" }}>
      <Container component="main" maxWidth="lg">
        <Grid container alignItems={"center"} justify={"center"}>
          <Grid item>
            <Typography>
              <Button component={Link} color="primary" to="/dashboard">
                Home
              </Button>
              <Button component={Link} color="primary" to="/allblogs">
                Blogs
              </Button>
              <Button component={Link} color="primary" to="/about">
                About
              </Button>
              {auth ? (
                <Button component={Link} color="secondary" to="/blogpost">
                  New Blog
                </Button>
              ) : (
                ""
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Button size="small" href="https://www.instagram.com/">
              <InstagramIcon fontSize="small" />
            </Button>
            <Button size="small" href="https://www.facebook.com/">
              <FacebookIcon fontSize="small" />
            </Button>

            <Button size="small" href="https://twitter.com/home?lang=en">
              <TwitterIcon fontSize="small" />
            </Button>
            <Button
              size="small"
              href="https://www.linkedin.com/in/mark-gerald-duenas/"
            >
              <LinkedInIcon fontSize="small" />
            </Button>
            {auth ? (
              <Button component={Link} color="secondary" to="/logout">
                Logout
              </Button>
            ) : (
              <Button component={Link} color="secondary" to="/login">
                Login/Register
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Nav;
