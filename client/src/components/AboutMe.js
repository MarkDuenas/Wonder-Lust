import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  img: {
    width: "250px",
    height: "250px",
  },
  paper: {
    padding: 20,
  },
}));

const AboutMe = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item>
          <Paper className={classes.paper}>
            <img
              className={classes.img}
              src="https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/117157239_3857599670922953_4220836261566185215_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=puDhB-50J84AX-OJHjt&_nc_ht=scontent-sea1-1.xx&oh=f0fe046bd69713b37ff0333de590fde3&oe=5F93EE34"
              alt="profile image"
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant="h2"> About me</Typography>
            <Typography variant="body1">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              mollis felis facilisis, blandit metus sit amet, dictum mauris.
              Praesent tincidunt, justo eu dictum scelerisque, leo lacus
              efficitur ligula, et tincidunt nibh turpis et nibh. Vivamus
              condimentum vel mi a ornare. Etiam eget odio nec arcu venenatis
              molestie ut pulvinar est. Cras in magna eget nisl viverra posuere.
              Praesent in sem non ex congue finibus. Suspendisse condimentum,
              mauris eu scelerisque malesuada, lectus mauris maximus leo, sed
              placerat purus nisi at nisl. Mauris aliquam dapibus orci ac
              tempor.{" "}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutMe;
