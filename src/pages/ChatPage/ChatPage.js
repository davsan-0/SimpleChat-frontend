import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Header from "../../common/Header";
import { getChatWithId } from "../../api/api";
import ChatTextInput from "./ChatTextInput";
import ChatWindow from "./ChatWindow";
import { selectChats } from "../ChatListPage/chatsSlice";

const useStyles = makeStyles({
  chatPage: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    flexWrap: "nowrap",
    height: "100vh"
  }
});

const ChatPage = ({ websocket }) => {
  const classes = useStyles();
  const { id } = useParams();
  const chat = useSelector(selectChats)[id];
  const [title, setTitle] = useState();
  const [latestMessage, setLatestMessage] = useState();

  /*useEffect(() => {
    getChatWithId("d1aab523-7e90-4bf0-b24a-0b3ce208280e").then(res => {
      setTitle(res.data.id);
      setLatestMessage(res.data.latestMessage);
    });
  }, []);*/

  return (
    <div className={classes.chatPage}>
      <Header title={chat && chat.name} backButton />
      <ChatWindow id={id} />
      {/*latestMessage &&
        `${latestMessage.createdAt} ${latestMessage.author.name}: ${latestMessage.text}`*/}
      <ChatTextInput websocket={websocket} chatId={id} />
    </div>
  );
};

export default ChatPage;
