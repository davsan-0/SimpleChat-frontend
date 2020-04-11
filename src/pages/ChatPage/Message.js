import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    alignItems: "center",
    marginBottom: ".5rem",
  },
  messageBody: {
    borderRadius: "2rem",
    display: "inline-block",
    position: "relative",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: ".2rem",
    background: theme.palette.background.default,
    zIndex: -1,
  },
  messageSelfDiv: {
    alignSelf: "flex-end",
  },
  messageSelf: {
    background: theme.palette.primary.light,
    color: "white",
  },
  author: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  avatar: {
    height: "3rem",
    width: "3rem",
    display: "inline-block",
    marginLeft: ".5rem",
  },
}));

const Message = ({ text, isAuthor, author, imageUrl }) => {
  const classes = useStyles();

  const renderAuthor = () => {
    return (
      <Typography
        className={classes.author}
        variant="subtitle1"
        color="textSecondary"
      >
        {author}
      </Typography>
    );
  };

  return (
    <div className={`${(isAuthor && classes.messageSelfDiv) || ""}`}>
      {author && renderAuthor()}
      <div className={classes.flex}>
        {(imageUrl && (
          <Avatar className={classes.avatar} alt={author} src={imageUrl} />
        )) || <div className={classes.avatar} />}
        <Paper
          variant="elevation"
          elevation={1}
          className={`${classes.messageBody} ${
            isAuthor && classes.messageSelf
          }`}
        >
          <Typography variant="body1">{text}</Typography>
        </Paper>
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  isAuthor: PropTypes.bool,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default Message;
