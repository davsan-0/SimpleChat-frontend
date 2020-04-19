import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Header from "../../common/Header/Header";
import ChatList from "./ChatList";
import CreateChatPopup from "./CreateChat/CreateChatPopup";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
  },
  chatListPage: {
    position: "relative",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  fabButton: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

const ChatListPage = () => {
  const classes = useStyles();
  const [addMenu, setAddMenu] = useState(false);

  const openMenu = (event) => {
    setAddMenu(true);
  };

  const closeMenu = (event) => {
    setAddMenu(false);
  };

  return (
    <div className={classes.root}>
      <Header
        title={addMenu ? "Create New Chat" : "SimpleChat"}
        backButton={addMenu}
        onBackClick={() => setAddMenu(false)}
      />
      <div className={classes.chatListPage}>
        <ChatList />
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fabButton}
          onClick={openMenu}
        >
          <AddIcon />
        </Fab>
        <CreateChatPopup in={addMenu} onCreate={closeMenu} />
      </div>
    </div>
  );
};

export default ChatListPage;
