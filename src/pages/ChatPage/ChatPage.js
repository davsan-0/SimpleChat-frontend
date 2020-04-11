import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Header from "../../common/Header";
import { getChatWithId } from "../../api/rest";
import ChatTextInput from "./ChatTextInput";
import ChatWindow from "./ChatWindow";
import {
  selectChats,
  setFocused,
  setUnfocused,
} from "../ChatListPage/chatsSlice";

const useStyles = makeStyles({
  chatPage: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    flexWrap: "nowrap",
    height: "100vh",
  },
});

const ChatPage = ({ websocket }) => {
  const classes = useStyles();
  const { id } = useParams();
  const chat = useSelector(selectChats)[id];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFocused(id));

    return () => {
      dispatch(setUnfocused(id));
    };
  }, []);

  return (
    <div className={classes.chatPage}>
      <Header title={chat && chat.name} backButton />
      <ChatWindow id={id} />
      <ChatTextInput websocket={websocket} chatId={id} />
    </div>
  );
};

export default ChatPage;
