import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import parseDate from "../utils/parseDate";

const useStyles = makeStyles({
  chatListItem: {
    minWidth: 275
    //margin: "1rem 0"
  },
  title: {
    fontSize: 14
  },
  pos: {
    display: "inline-block",
    marginBottom: ".8rem",
    marginTop: ".3rem"
  },
  timestamp: {
    fontStyle: "italic",
    display: "inline-block",
    position: "absolute",
    right: 0,
    marginRight: "2rem",
    marginBottom: "1rem",
    marginTop: ".3rem"
  }
});

const ChatListItem = ({ chatName, latestMessage }) => {
  const classes = useStyles();

  const renderMessage = () => {
    if (latestMessage) {
      return (
        <>
          <Typography
            className={classes.pos}
            variant="subtitle1"
            color="textSecondary"
          >
            {`${latestMessage.author.name}: ${latestMessage.text}`}
          </Typography>
          <Typography
            className={classes.timestamp}
            variant="subtitle1"
            color="textSecondary"
          >
            {parseDate(latestMessage.createdAt)}
          </Typography>
        </>
      );
    }
  };

  return (
    <div className={classes.chatListItem}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" component="h2" noWrap>
            {chatName}
          </Typography>
          {renderMessage()}
        </CardContent>
      </CardActionArea>
    </div>
  );
};

export default ChatListItem;
