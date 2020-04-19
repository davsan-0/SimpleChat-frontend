import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  unreadBadge: {
    display: "inline-block",
    width: "2rem",
    height: "2rem",
    marginRight: ".5rem",
    borderRadius: "2rem",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    fontWeight: "bold",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const UnreadBadge = ({ count }) => {
  const classes = useStyles();
  return <span className={classes.unreadBadge}>{count}</span>;
};

export default UnreadBadge;
