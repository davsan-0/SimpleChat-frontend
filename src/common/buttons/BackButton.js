import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  backButton: {
    color: "white",
    marginLeft: theme.spacing(-2)
  }
}));

const BackButton = props => {
  const classes = useStyles();

  return (
    <IconButton
      aria-label="back"
      component="span"
      onClick={props.onClick}
      className={classes.backButton}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
