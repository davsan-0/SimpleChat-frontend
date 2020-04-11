import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  unreadBadge: {
    display: "inline-block",
    verticalAlign: "baseline",
    width: "2rem",
    height: "2rem",
    marginRight: ".5rem",
    borderRadius: "2rem",
    backgroundColor: theme.palette.secondary.main,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
}));

const UnreadBadge = ({ count }) => {
  const classes = useStyles();
  return <span className={classes.unreadBadge}>{count}</span>;
};

export default UnreadBadge;
