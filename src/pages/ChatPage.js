import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header";
import { getChatWithId } from "../api/api";
import ChatTextInput from "../components/ChatTextInput";
import ChatWindow from "../components/ChatWindow";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
  }
});

const ChatPage = props => {
  const classes = useStyles();
  const [title, setTitle] = useState();
  const [latestMessage, setLatestMessage] = useState();

  useEffect(() => {
    getChatWithId("d1aab523-7e90-4bf0-b24a-0b3ce208280e").then(res => {
      setTitle(res.data.id);
      setLatestMessage(res.data.latestMessage);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Header title={title} />
      <ChatWindow />
      {/*latestMessage &&
        `${latestMessage.createdAt} ${latestMessage.author.name}: ${latestMessage.text}`*/}
      <ChatTextInput />
    </div>
  );
};

export default ChatPage;
