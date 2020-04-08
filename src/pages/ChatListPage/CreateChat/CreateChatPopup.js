import React from "react";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";

import CreateChatForm from "./CreateChatForm";

/*const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  top: {
    zIndex: 1,
    position: "absolute",
    height: "100vh",
    width: "100vw",
    backgroundColor: "white",
    marginTop: theme.spacing(1),
  },
  paper: {
    position: "relative",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
}));*/

const CreateChatPopup = (props) => {
  //const classes = useStyles();

  return (
    <Slide direction="up" in={props.in} mountOnEnter unmountOnExit>
      <CreateChatForm onCreate={props.onCreate} />
    </Slide>
  );
};

export default CreateChatPopup;