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

  const renderMessages = msgs => {
    let prevAuthor = null;
    let hasNewAuthor;
    const data = msgs.map(el => {
      if (el.author.name === prevAuthor) {
        hasNewAuthor = false;
      } else {
        prevAuthor = el.author.name;
        hasNewAuthor = true;
      }
      const isAuthor = el.author.id === userId;

      return (
        <Message
          key={el.id}
          author={!isAuthor && hasNewAuthor && prevAuthor}
          text={el.text}
          isAuthor={isAuthor}
        />
      );
    });

    return data;
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
