import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import ChatListItem from "./ChatListItem";
import { getAllChatsWithUserId } from "../../api/api";

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
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getAllChatsWithUserId("91715fd2-f320-4430-80bc-1e2a7de41a64").then(res => {
      const arr = res.data.map((el, i) => {
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
          <div>
            <ChatListItem
              chatName={name}
              latestMessage={el.latestMessage}
              to={`/chat/${el.id}`}
            />
            {i < res.data.length - 1 && <Divider variant="middle" />}
          </div>
        );
      });
      setChats(arr);
    });
  }, []);

  let arr = [
    <ChatListItem
      chatName="Chat1"
      latestMessage={{ author: "David", timestamp: "19:05", text: "Hej" }}
    />,
    <ChatListItem
      chatName="Chat2"
      latestMessage={{
        author: "Njetski Baretski",
        timestamp: "11:33",
        text: "Nej"
      }}
    />,
    <ChatListItem
      chatName="Chat3"
      latestMessage={{ author: "Crab", timestamp: "18:35", text: "Craab" }}
    />
  ];
  arr = arr.concat(arr).concat(arr);
  arr = arr.map((el, i) => {
    if (i === arr.length - 1) {
      return el;
    }
    return (
      <div>
        {el}
        <Divider variant="middle" />
      </div>
    );
  });

  //console.log(arr);
  //arr = [];

  return (
    <div className={classes.root}>
      {(chats.length > 0 && chats) || (
        <div className={classes.noChatText}>
          No chats available.
          <br />
          Click the + to start a new chat.
        </div>
      )}
    </div>
  );
};

export default ChatList;
