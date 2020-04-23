import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import parseDate from "../../utils/parseDate";
import { Link } from "react-router-dom";
import { findByLabelText } from "@testing-library/react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import UnreadBadge from "./UnreadBadge";
import CustomAvatarGroup from "../../common/CustomAvatarGroup";
import { selectUserId } from "../LoginPage/loginSlice";
import CustomAvatar from "../../common/CustomAvatar";

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
              {`${
                latestMessage.author.id === userId
                  ? "You"
                  : latestMessage.author.name
              }: ${latestMessage.text}`}
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

    return others.map((el) => (
      <CustomAvatar
        key={el.id}
        isOnline={Boolean(el.online)}
        alt={el.name}
        src={el.imageUrl}
      />
    ));
  };

  return (
    <div className={classes.chatListItem}>
      <CardActionArea component={Link} to={to}>
        <CardContent>
          <Typography variant="h6" component="h2" noWrap>
            {chatName}
          </Typography>
          {renderMessage()}
          <CustomAvatarGroup max={5} className={classes.avatarGroup}>
            {renderAvatars()}
          </CustomAvatarGroup>
        </CardContent>
      </CardActionArea>
    </div>
  );
};

ChatListItem.propTypes = {
  chatName: PropTypes.string,
  to: PropTypes.string,
  latestMessage: PropTypes.object,
  hasUnread: PropTypes.bool,
  unreadAmount: PropTypes.number,
  participants: PropTypes.array,
};

export default ChatListItem;
