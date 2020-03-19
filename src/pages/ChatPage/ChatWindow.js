import React, { useState, useEffect, useRef } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

import Message from "./Message";

const useStyles = makeStyles(theme => ({
  chatWindow: {
    //flex: "1 0 auto",
    //overflowY: "scroll",
    flexGrow: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: theme.spacing(1)
  }
}));

const ChatWindow = props => {
  const classes = useStyles();
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight; // Sets the scroll bar to bottom of container
  }, []);

  let arr = [
    <Message text="Hej jag heter david !!! :))))" />,
    <Message removeAuthorText text="Olha tirolesa!" />,
    <Message removeAuthorText isAuthor text="ccte" />
  ];

  arr = arr
    .concat(arr)
    .concat(arr)
    .concat(arr)
    .concat(arr);
  return (
    <div className={classes.chatWindow} ref={scrollRef}>
      {arr}
    </div>
  );
};

export default ChatWindow;
