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
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    background: theme.palette.background.default,
    zIndex: -1
  },
  messageSelfDiv: {
    alignSelf: "flex-end"
  },
  messageSelf: {
    background: theme.palette.primary.light,
    color: "white"
  },
  author: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    alignText: "bottom"
  }
}));

const Message = ({ text, isAuthor, removeAuthorText }) => {
  const classes = useStyles();

  const renderAuthor = () => {
    return (
      <Typography
        className={classes.author}
        variant="subtitle1"
        color="textSecondary"
      >
        Davvo
      </Typography>
    );
  };

  return (
    <div className={`${classes.message} ${isAuthor && classes.messageSelfDiv}`}>
      {!removeAuthorText && renderAuthor()}
      <Paper
        variant="elevation"
        elevation={1}
        className={`${classes.messageBody} ${isAuthor && classes.messageSelf}`}
      >
        <Typography variant="body1">{text}</Typography>
      </Paper>
    </div>
  );
};

export default Message;
