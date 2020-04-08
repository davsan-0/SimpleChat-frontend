import React, { useState, useEffect, useRef } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import Message from "./Message";
import { getChatMessages } from "../../api/rest";
import { selectUserId } from "../LoginPage/loginSlice";
import {
  setChatMessages,
  selectMessages,
  selectHasUnread,
  setHasRead
} from "../ChatListPage/chatsSlice";

const useStyles = makeStyles(theme => ({
  chatWindow: {
    flexGrow: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
}));

const ChatWindow = ({ id }) => {
  const classes = useStyles();
  const scrollRef = useRef();
  const userId = useSelector(selectUserId);
  const messages = useSelector(selectMessages(id));
  const hasUnread = useSelector(selectHasUnread);
  const dispatch = useDispatch();

  const renderMessages = messageArray => {
    let prevAuthor = null;
    let hasNewAuthor;

    return messageArray.map(message => {
      if (message.author.name === prevAuthor) {
        hasNewAuthor = false;
      } else {
        prevAuthor = message.author.name;
        hasNewAuthor = true;
      }
      const isAuthor = message.author.id === userId;

      return (
        <Message
          key={message.id}
          author={!isAuthor && hasNewAuthor && prevAuthor}
          text={message.text}
          isAuthor={isAuthor}
        />
      );
    });
  };

  useEffect(() => {
    getChatMessages(id, "asc").then(res => {
      dispatch(setChatMessages(res.data));
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight; // Sets the scroll bar to bottom of container
  }, [messages]);

  /*useEffect(() => {
    dispatch(setHasRead(id));
  }, [hasUnread === true]);*/

  return (
    <div className={classes.chatWindow} ref={scrollRef}>
      {messages && renderMessages(messages)}
    </div>
  );
};

export default ChatWindow;
