import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import parseDate from "../../utils/parseDate";
import { Link } from "react-router-dom";
import { findByLabelText } from "@testing-library/react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { useSelector } from "react-redux";

import UnreadBadge from "./UnreadBadge";
import { selectUserId } from "../LoginPage/loginSlice";

const useStyles = makeStyles((theme) => ({
  textWrap: {
    position: "relative",
    paddingBottom: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  msgtext: {
    flex: "1 1 auto",
    marginBottom: "1rem",
    marginTop: ".3rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  timestamp: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontStyle: "italic",
    display: "inline-block",
  },
  latestMessage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarGroup: {
    marginLeft: theme.spacing(1),
  },
  bold: {
    fontWeight: "bold",
  },
}));

const ChatListItem = ({
  to,
  chatName,
  latestMessage,
  hasUnread,
  unreadAmount,
  participants,
}) => {
  const classes = useStyles();
  const userId = useSelector(selectUserId);

  const renderMessage = () => {
    if (latestMessage) {
      return (
        <div className={classes.textWrap}>
          <div className={classes.latestMessage}>
            <Typography
              className={`${classes.msgtext} ${hasUnread && classes.bold}`}
              variant="subtitle1"
              color="textSecondary"
            >
              {hasUnread && <UnreadBadge count={unreadAmount} />}
              {`${latestMessage.author.name}: ${latestMessage.text}`}
            </Typography>
          </div>
          <Typography
            className={`${classes.timestamp} ${
              (hasUnread && classes.bold) || ""
            }`}
            variant="subtitle1"
            color="textSecondary"
          >
            {parseDate(latestMessage.createdAt)}
          </Typography>
        </div>
      );
    }
  };

  const renderAvatars = () => {
    const others = participants.filter((user) => user.id !== userId);

    return others.map((el) => <Avatar alt={el.name} src={el.imageUrl} />);
  };

  return (
    <div className={classes.chatListItem}>
      <CardActionArea component={Link} to={to}>
        <CardContent>
          <Typography variant="h6" component="h2" noWrap>
            {chatName}
          </Typography>
          {renderMessage()}
          <AvatarGroup max={5} className={classes.avatarGroup}>
            {renderAvatars()}
          </AvatarGroup>
        </CardContent>
      </CardActionArea>
    </div>
  );
};

ChatListItem.propTypes = {
  chatName: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  latestMessage: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool.isRequired,
  unreadAmount: PropTypes.number.isRequired,
  participants: PropTypes.array.isRequired,
};

export default ChatListItem;
