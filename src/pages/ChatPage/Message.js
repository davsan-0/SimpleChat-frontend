import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import CheckIcon from "@material-ui/icons/Check";
import Grow from "@material-ui/core/Grow";
import Avatar from "@material-ui/core/Avatar";

import CustomAvatar from "../../common/CustomAvatar";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    alignItems: "center",
    marginBottom: ".2rem",
  },
  messageBody: {
    borderRadius: "2rem",
    position: "relative",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: ".2rem",
    background: theme.palette.background.default,
    zIndex: -1,
    minWidth: "3rem",
    textAlign: "center",
  },
  messageSelfDiv: {
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
  messageSelf: {
    background: theme.palette.primary.light,
    color: "white",
  },
  author: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  avatar: {
    height: "3.5rem",
    width: "3.5rem",
    marginLeft: ".5rem",
  },
  avatarSmall: {
    height: "1.7rem",
    width: "1.7rem",
    marginLeft: ".1rem",
  },
  readReceipt: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    marginBottom: ".2rem",
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  leftPos: {
    left: "5rem",
  },
  rightPos: {
    right: "1rem",
  },
}));

const Message = ({
  text,
  isAuthor,
  author,
  imageUrl,
  readReceipts = [],
  isOnline,
}) => {
  const classes = useStyles();
  const readReceiptTimeout = 400;

  const renderAuthor = () => {
    return (
      <Typography
        className={classes.author}
        variant="subtitle1"
        color="textSecondary"
      >
        {author}
      </Typography>
    );
  };

  const renderReadReceipts = () => {
    const avatars = readReceipts.map((el) => (
      <Grow key={el.id} in={true} timeout={readReceiptTimeout}>
        <Avatar
          className={classes.avatarSmall}
          alt={el.name}
          src={el.imageUrl}
        />
      </Grow>
    ));

    return (
      <div
        className={`${classes.readReceipt} 
        ${(isAuthor && classes.flexEnd) || ""} 
        ${(isAuthor && classes.rightPos) || classes.leftPos}`}
      >
        <Grow in={true} timeout={readReceiptTimeout}>
          <CheckIcon
            className={classes.avatarSmall}
            style={{ color: "rgba(0,0,0,0.5)" }}
          />
        </Grow>
        {avatars}
      </div>
    );
  };

  return (
    <div className={`${(isAuthor && classes.messageSelfDiv) || ""}`}>
      {author && renderAuthor()}
      <div className={`${classes.flex} ${(isAuthor && classes.flexEnd) || ""}`}>
        {(imageUrl && (
          <CustomAvatar
            isOnline={Boolean(isOnline)}
            className={classes.avatar}
            alt={author}
            src={imageUrl}
          />
        )) || <div className={classes.avatar} />}
        <Paper
          variant="elevation"
          elevation={1}
          className={`${classes.messageBody} ${
            isAuthor && classes.messageSelf
          }`}
        >
          <Typography variant="body1">{text}</Typography>
        </Paper>
      </div>
      {readReceipts.length > 0 && renderReadReceipts()}
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  isAuthor: PropTypes.bool,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
  readReceipts: PropTypes.array,
  isOnline: PropTypes.bool,
};

export default Message;
