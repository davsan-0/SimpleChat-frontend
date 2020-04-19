import React, { useState, useEffect } from "react";

import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { green, teal, red } from "@material-ui/core/colors";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ChatListPage from "../pages/ChatListPage/ChatListPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import { startWebsocket, stopWebsocket, getClient } from "../api/websocket";
import {
  selectIsLoggedIn,
  selectFetching,
  selectUserId,
} from "../pages/LoginPage/loginSlice";
import { selectChats } from "../pages/ChatListPage/chatsSlice";
import CenteredSpinner from "../common/CenteredSpinner";

let theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: red,
  },
  typography: {
    htmlFontSize: 10,
  },
});

theme = responsiveFontSizes(theme);

const intervalMap = new Map();
let runOnce = false;

const App = (props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isFetching = useSelector(selectFetching);
  const chats = useSelector(selectChats);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const intervalTime = 10000;

  useEffect(() => {
    const wsClient = getClient();
    if (isLoggedIn && wsClient === null) {
      console.log("user ", userId);
      startWebsocket(dispatch, chats);
    } else {
      stopWebsocket();
      console.log("WS Client deactivated");
    }

    if (!runOnce && isLoggedIn && Object.keys(chats).length > 0) {
      Object.keys(chats).forEach((chatId) => {
        const heartbeat = () => {
          const wsClient = getClient();
          if (wsClient?.connected) {
            wsClient.publish({
              destination: `/ws/app/chats/${chatId}/online`,
              body: userId,
            });
          }
        };

        heartbeat();
        const intervalId = setInterval(
          heartbeat,
          intervalTime + Math.random() * 1000
        );
        intervalMap.set(chatId, intervalId);
      });
      runOnce = true;
    }

    if (!isLoggedIn && intervalMap.length > 0) {
      intervalMap.forEach((val, key) => {
        clearInterval(key);
      });
      intervalMap.clear();
      runOnce = false;
    }
  }, [isLoggedIn]);

  const checkStatus = () => {
    if (isFetching) return <CenteredSpinner />;
    if (!isLoggedIn) return <Redirect to="/login" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Route path="/" exact component={ChatListPage} />
      <Route path="/chat/:id" component={ChatPage} />
      <Route path="/login" exact component={LoginPage} />
      {checkStatus()}
    </ThemeProvider>
  );
};

export default App;
