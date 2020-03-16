import React from "react";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import SendButton from "./SendButton";

const useStyles = makeStyles(theme => ({
  chatTextInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1.5),
    marginTop: theme.spacing(1),
    "& .MuiOutlinedInput-root": {
      borderRadius: "2.5rem"
    }
  },
  inputField: {
    flexGrow: 1
  },
  sendButton: {
    margin: "0 1rem"
  }
}));

const ChatTextInput = props => {
  const classes = useStyles();
  const [input, setInput] = React.useState("");
  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    console.log(input);
    console.log(event);
    setInput("");
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div>
      <Divider />
      <form
        className={classes.chatTextInput}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          className={classes.inputField}
          id="chat-text-input"
          label="Message"
          value={input}
          onChange={handleChange}
          variant="outlined"
          multiline
          rowsMax="3"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        />
        <SendButton className={classes.sendButton} onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default ChatTextInput;
