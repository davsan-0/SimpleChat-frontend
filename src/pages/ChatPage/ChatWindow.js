import React, { useState, useEffect, useRef } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import Message from "./Message";
import { getChatMessages } from "../../api/rest";
import { selectUserId } from "../LoginPage/loginSlice";
import {
  setChatMessages,
  selectMessages,
  selectParticipants,
  selectChat,
  setChatIsFetching,
  setChatHasFetched,
} from "../ChatListPage/chatsSlice";
import CenteredSpinner from "../../common/CenteredSpinner";

const useStyles = makeStyles((theme) => ({
  chatWindow: {
    flexGrow: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}));

const ChatWindow = ({ id }) => {
  const classes = useStyles();
  const scrollRef = useRef();
  const userId = useSelector(selectUserId);
  const chat = useSelector(selectChat(id));
  const participants = useSelector(selectParticipants(id));
  const messages = useSelector(selectMessages(id));
  const dispatch = useDispatch();

  const renderMessages = (messageArray) => {
    const readReceipts = _.groupBy(participants, "lastReadMessage");
    let prevAuthor = null;
    let hasNewAuthor;

    return messageArray.map((message, i) => {
      if (message.author.id === prevAuthor) {
        hasNewAuthor = false;
      } else {
        prevAuthor = message.author.id;
        hasNewAuthor = true;
      }
      const isAuthor = message.author.id === userId;

      let showImage = false;
      if (
        i === messageArray.length - 1 ||
        messageArray[i + 1].author.id !== messageArray[i].author.id
      ) {
        showImage = true;
      }

      const readReceiptsArr = readReceipts[message.id]?.filter(
        (user) => user.id !== userId
      );

      return (
        <Message
          key={message.id}
          author={
            (!isAuthor && hasNewAuthor && message.author.name) || undefined
          }
          imageUrl={
            (showImage && !isAuthor && message.author.imageUrl) || undefined
          }
          text={message.text}
          isAuthor={isAuthor}
          readReceipts={readReceiptsArr}
          isOnline={Boolean(message.author.online)}
        />
      );
    });
  };

  useEffect(() => {
    if (!chat?.hasFetched) {
      dispatch(setChatIsFetching(id));
      getChatMessages(id, "asc").then((res) => {
        dispatch(setChatHasFetched(id));
        dispatch(setChatMessages(res.data));
      });
    }
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight; // Sets the scroll bar to bottom of container
  }, [messages, participants]);

  return (
    <>
      {(chat?.fetching && (
        <div style={{ flexGrow: 1 }}>
          <CenteredSpinner />
        </div>
      )) || (
        <div className={classes.chatWindow} ref={scrollRef}>
          {messages && renderMessages(messages)}
        </div>
      )}
    </>
  );
};

export default ChatWindow;
