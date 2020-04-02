import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import ChatListItem from "./ChatListItem";
import { getAllChatsWithUserId } from "../../api/rest";
import { selectChats } from "./chatsSlice";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  noChatText: {
    color: "rgba(200, 200, 200, 1)",
    fontSize: "1.5rem",
    textAlign: "center",
    marginTop: "2rem",
    fontStyle: "italic"
  },
  chatLink: {
    textDecoration: "none",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none"
    }
  }
});

const ChatList = props => {
  const classes = useStyles();
  const chats = useSelector(selectChats);

  const renderChats = () => {
    let chatList = Object.values(chats);
    console.log(chatList);
    chatList.sort((a, b) => {
      const m1 = b.latestMessage && new Date(b.latestMessage.createdAt);
      const m2 = a.latestMessage && new Date(a.latestMessage.createdAt);
      if (!m1) return -1;
      if (!m2) return 1;
      return m1 - m2;
    });

    chatList = chatList.map((el, i) => {
      const name =
        el.name === undefined
          ? el.participants
              .map((u, j) => {
                if (j !== el.participants.length - 1) return u.name + ", ";
                return u.name;
              })
              .join("")
          : el.name;
      return (
        <div key={el.id}>
          <ChatListItem
            chatName={name}
            latestMessage={el.latestMessage}
            to={`/chat/${el.id}`}
            hasUnread={el.hasUnread}
          />
          {i < chatList.length - 1 && <Divider variant="middle" />}
        </div>
      );
    });

    return chatList;
  };

  return (
    <div className={classes.root}>
      {(Object.keys(chats).length > 0 && renderChats()) || (
        <div className={classes.noChatText}>
          No chats available.
          <br />
          Click the + to start a new chat!
        </div>
      )}
    </div>
  );
};

export default ChatList;
