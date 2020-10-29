import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const LoginRegForm = () => {
  const [regUser, setRegUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [logUser, setLogUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [logInError, setLogInError] = useState({});

  const logOnChangeHandler = (e) => {
    setLogUser({
      ...logUser,
      [e.target.name]: e.target.value,
    });
  };

  const logSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/user/login`, logUser, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "success") {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        setLogInError(err.response.data);
      });
  };

  const regOnChangeHandler = (e) => {
    setRegUser({
      ...regUser,
      [e.target.name]: e.target.value,
    });
  };

  const regSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/user/register", regUser, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "success") {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={logSubmitHandler} className={classes.form} noValidate>
          {logInError.email ? (
            <TextField
              error
              helperText={logInError.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="logEmail"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={logOnChangeHandler}
              value={logUser.email}
            />
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="logEmail"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={logOnChangeHandler}
              value={logUser.email}
            />
          )}
          {logInError.password ? (
            <TextField
              error
              helperText={logInError.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="logPassword"
              autoComplete="current-password"
              onChange={logOnChangeHandler}
              value={logUser.password}
            />
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="logPassword"
              autoComplete="current-password"
              onChange={logOnChangeHandler}
              value={logUser.password}
            />
          )}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>

      {/*  Sign Up Page */}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={regSubmitHandler} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {errors.firstName ? (
                <TextField
                  error
                  helperText={errors.firstName.message}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={regOnChangeHandler}
                />
              ) : (
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={regOnChangeHandler}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {errors.lastName ? (
                <TextField
                  error
                  helperText={errors.lastName.message}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={regOnChangeHandler}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={regOnChangeHandler}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {errors.email ? (
                <TextField
                  error
                  helperText={errors.email.message}
                  variant="outlined"
                  required
                  fullWidth
                  id="regEmail"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={regOnChangeHandler}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="regEmail"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={regOnChangeHandler}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {errors.password ? (
                <TextField
                  error
                  helperText={errors.password.message}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="regPassword"
                  autoComplete="current-password"
                  onChange={regOnChangeHandler}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="regPassword"
                  autoComplete="current-password"
                  onChange={regOnChangeHandler}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {errors.confirmPassword ? (
                <TextField
                  error
                  helperText={errors.confirmPassword.message}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  onChange={regOnChangeHandler}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  onChange={regOnChangeHandler}
                />
              )}
            </Grid>
            {/* <Grid item xs={12}> */}
            {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            {/* </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {/* <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
};

export default LoginRegForm;
