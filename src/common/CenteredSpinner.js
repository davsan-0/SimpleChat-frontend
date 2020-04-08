import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const CenteredSpinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.center}>
      <CircularProgress />
    </div>
  );
};

export default CenteredSpinner;
