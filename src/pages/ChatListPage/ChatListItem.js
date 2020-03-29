import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import parseDate from "../../utils/parseDate";
import { Link } from "react-router-dom";
import { findByLabelText } from "@testing-library/react";

const useStyles = makeStyles({
  chatListItem: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  msgtext: {
    flex: "1 1 auto",
    marginBottom: ".8rem",
    marginTop: ".3rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  timestamp: {
    flex: "0 0 auto",
    fontStyle: "italic",
    display: "inline-block",
    padding: ".3rem 1rem 1rem 1rem"
  },
  latestMessage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const ChatListItem = ({ to, chatName, latestMessage, hasUnread }) => {
  const classes = useStyles();

  const renderMessage = () => {
    if (latestMessage) {
      return (
        <div className={classes.latestMessage}>
          <Typography
            className={classes.msgtext}
            variant="subtitle1"
            color="textSecondary"
            style={hasUnread && { fontWeight: "bold" }}
          >
            {`${latestMessage.author.name}: ${latestMessage.text}`}
          </Typography>
          <Typography
            className={classes.timestamp}
            variant="subtitle1"
            color="textSecondary"
            style={hasUnread && { fontWeight: "bold" }}
          >
            {parseDate(latestMessage.createdAt)}
          </Typography>
        </div>
      );
    }
  };

  return (
    <div className={classes.chatListItem}>
      <CardActionArea component={Link} to={to}>
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
