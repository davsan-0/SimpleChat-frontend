import React, { useState, useEffect } from "react";
import "../sass/main.scss";

import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from "@material-ui/core/styles";
import { green, teal, red } from "@material-ui/core/colors";
import { Route } from "react-router-dom";

import ChatListPage from "../pages/ChatListPage/ChatListPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import startWebsocket from "../api/websocket";

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

  useEffect(() => {
    const client = startWebsocket();
    setWebsocket(client);
  }, []);

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
    </ThemeProvider>
  );
};

export default App;
