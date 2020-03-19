import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../../common/Header";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { selectIsLoggedIn } from "./loginSlice";

const useStyles = makeStyles(theme => ({
  loginPage: {
    height: "100vh"
  },
  loginButton: { backgroundColor: theme.palette.primary },
  loginWindow: {
    height: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  logo: {
    maxWidth: "60%",
    width: "auto",
    height: "auto"
  }
}));

const LoginPage = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) return <Redirect to="/" />;

  return (
    <div className={classes.loginPage}>
      <Header />
      <div className={classes.loginWindow}>
        <img className={classes.logo} src="SC.png" alt="logo" />
        <Paper elevation={4}>
          <GoogleLoginComponent className={classes.loginButton} />
        </Paper>
      </div>
    </div>
  );
};

export default LoginPage;
