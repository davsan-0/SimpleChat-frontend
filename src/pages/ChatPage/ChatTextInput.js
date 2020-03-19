import React from "react";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import SendButton from "../../common/buttons/SendButton";

const useStyles = makeStyles(theme => ({
  chatTextInput: {
    flexShrink: 0
  },
  chatTextForm: {
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

const ChatTextInput = ({ websocket }) => {
  const classes = useStyles();
  const [input, setInput] = React.useState("");
  const handleChange = event => {
    setInput(event.target.value);
  };
  console.log(websocket);
  const handleSubmit = event => {
    const text = {
      id: "c2d80cae-2e12-4a8c-a7ae-47b74c0a16d7",
      chatId: "d1aab523-7e90-4bf0-b24a-0b3ce208280e",
      text: input
    };
    setInput("");

    websocket.publish({
      destination: "/app/chats/message",
      body: JSON.stringify(text)
    });
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div className={classes.chatTextInput}>
      <Divider />
      <form
        className={classes.chatTextForm}
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
