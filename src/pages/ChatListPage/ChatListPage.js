import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Header from "../../common/Header";
import ChatList from "./ChatList";
import CreateChatPopup from "./CreateChat/CreateChatPopup";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  fabButton: {
    position: "absolute",
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
          onClick={openMenu}
        >
          <AddIcon />
        </Fab>
        <CreateChatPopup in={addMenu} onCreate={closeMenu} />
      </div>
    </>
  );
};

export default ChatListPage;
