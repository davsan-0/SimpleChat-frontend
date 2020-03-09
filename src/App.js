import React from 'react';
import logo from './logo.svg';
import './sass/main.scss';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { green, teal, red } from '@material-ui/core/colors';


import ChatListPage from "./pages/ChatListPage";


let theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: red,
    background: {
      default: "000",
      paper: "000"
    }
  },
  typography: {
    htmlFontSize: 10,
  },
  
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChatListPage />
    </ThemeProvider>
  );
}

export default App;
