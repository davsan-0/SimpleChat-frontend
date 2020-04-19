import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Header from "../../common/Header/Header";
import { getChatWithId } from "../../api/rest";
import { getClient } from "../../api/websocket";
import ChatTextInput from "./ChatTextInput";
import ChatWindow from "./ChatWindow";
import { selectUserId } from "../LoginPage/loginSlice";
import {
  selectChats,
  setFocusedAndClearUnread,
  setUnfocused,
  selectHasUnread,
  selectLatestMessage,
  selectFocused,
} from "../ChatListPage/chatsSlice";

const useStyles = makeStyles({
  chatPage: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    flexWrap: "nowrap",
    height: "100%",
    width: "100%",
    position: "fixed",
  },
});

const ChatPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const chat = useSelector(selectChats)[id];
  const userId = useSelector(selectUserId);
  const hasUnread = useSelector(selectHasUnread(id));
  const latestMessage = useSelector(selectLatestMessage(id));
  const focused = useSelector(selectFocused(id));
  const dispatch = useDispatch();
  const websocket = getClient();

  const sendReadReceipt = (messageId) => {
    const payload = {
      userId: userId,
      messageId: messageId,
    };

    websocket.publish({
      destination: `/ws/app/chats/${id}/readreceipt`,
      body: JSON.stringify(payload),
    });
  };

  useEffect(() => {
    if (hasUnread) {
      sendReadReceipt(latestMessage.id);
    }

    dispatch(setFocusedAndClearUnread(id));

    return () => {
      dispatch(setUnfocused(id));
    };
  }, []);

  useEffect(() => {
    if (focused && latestMessage?.author.id !== userId) {
      sendReadReceipt(latestMessage.id);
    }
  }, [latestMessage]);

  return (
    <div className={classes.chatPage}>
      <Header title={chat && chat.name} backButton />
      <ChatWindow id={id} />
      <ChatTextInput chatId={id} />
    </div>
  );
};

export default ChatPage;
