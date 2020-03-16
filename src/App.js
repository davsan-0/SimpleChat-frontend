import React from "react";
import logo from "./logo.svg";
import "./sass/main.scss";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from "@material-ui/core/styles";
import { green, teal, red } from "@material-ui/core/colors";
import { Route } from "react-router-dom";

import ChatListPage from "./pages/ChatListPage";
import ChatPage from "./pages/ChatPage";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Route path="/" exact component={ChatListPage} />
      <Route path="/chat/:id" component={ChatPage} />
    </ThemeProvider>
  );
}

export default App;
