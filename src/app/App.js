import React, { useState, useEffect } from "react";
import "../sass/main.scss";

import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from "@material-ui/core/styles";
import { green, teal, red } from "@material-ui/core/colors";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import ChatListPage from "../pages/ChatListPage/ChatListPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import startWebsocket from "../api/websocket";
import { selectIsLoggedIn } from "../pages/LoginPage/loginSlice";
import { selectChats } from "../pages/ChatListPage/chatsSlice";

let theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: red
  },
  typography: {
    htmlFontSize: 10
  }
});

theme = responsiveFontSizes(theme);

const App = props => {
  const [websocket, setWebsocket] = useState();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const chats = useSelector(selectChats);

  useEffect(() => {
    if (isLoggedIn) {
      const client = startWebsocket(chats);
      setWebsocket(client);
    }
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <Route
        test="Hej"
        path="/"
        exact
        //render={props => <ChatListPage {...props} websocket={websocket} />}
        component={ChatListPage}
      />
      <Route
        path="/chat/:id"
        render={props => <ChatPage {...props} websocket={websocket} />}
      />
      <Route path="/login" exact component={LoginPage} />
      {!isLoggedIn && <Redirect to="/login" />}
    </ThemeProvider>
  );
};

export default App;
