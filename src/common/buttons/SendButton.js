import React from "react";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";

const SendButton = props => {
  return (
    <IconButton
      color="primary"
      aria-label="send message"
      component="span"
      onClick={props.onClick}
      className={props.className}
    >
      <SendIcon />
    </IconButton>
  );
};

export default SendButton;
