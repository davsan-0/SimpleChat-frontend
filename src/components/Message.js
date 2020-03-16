import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  message: {},
  messageBody: {
    borderRadius: "2rem",
    display: "inline-block",
    position: "relative",
    padding: theme.spacing(2),
    margin: "0 1rem",
    background: theme.palette.background.default
  },
  messageSelf: {
    color: "red"
  },
  author: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    alignText: "bottom"
  }
}));

const Message = props => {
  const classes = useStyles();
  const author = props.isAuthor;

  return (
    <div className={classes.message}>
      <Typography
        className={classes.author}
        variant="subtitle1"
        color="textSecondary"
      >
        Davvo
      </Typography>
      <Paper
        variant="outlined"
        elevation={3}
        className={`${classes.messageBody} ${author && classes.messageSelf}`}
      >
        Message
      </Paper>
    </div>
  );
};

export default Message;
