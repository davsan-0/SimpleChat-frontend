import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Message from "./Message";

const useStyles = makeStyles({
  root: {
    flex: "1 0 auto",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column"
  }
});

const ChatWindow = props => {
  const classes = useStyles();
  const arr = [<Message />, <Message isAuthor />, <Message />];
  return <div className={classes.root}>{arr}</div>;
};

export default ChatWindow;
