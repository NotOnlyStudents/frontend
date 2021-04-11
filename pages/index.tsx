import React from "react";
import { CardMedia } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

function Home() {
  const classes = useStyles();

  return (
    <>
      <div></div>
      <CardMedia className={classes.root} component="img" image="/home.jpg" />
    </>
  );
}

const useStyles = makeStyles({
  root: {
    opacity: 10
  },
});

export default Home;
