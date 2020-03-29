import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Header from "../../common/Header";
import ChatList from "./ChatList";
import CreateChatPopup from "../CreateChatPopup/CreateChatPopup";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden"
  },
  fabButton: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
}));

const ChatListPage = props => {
  const classes = useStyles();
  const history = useHistory();
  const [addMenu, setAddMenu] = useState(false);

  const handleClick = event => {
    setAddMenu(true);
  };

  return (
    <>
      <Header
        title={addMenu ? "Create New Chat" : "SimpleChat"}
        backButton={addMenu}
        onBackClick={() => setAddMenu(false)}
      />
      <div className={classes.root}>
        <ChatList />
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fabButton}
          onClick={handleClick}
        >
          <AddIcon />
        </Fab>
        <CreateChatPopup in={addMenu} />
      </div>
    </>
  );
};

export default ChatListPage;
