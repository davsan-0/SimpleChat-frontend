import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../../common/Header/Header";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { selectIsLoggedIn, selectFetching } from "./loginSlice";
import CenteredSpinner from "../../common/CenteredSpinner";

const useStyles = makeStyles((theme) => ({
  loginPage: {
    height: "100vh",
  },
  loginWindow: {
    height: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    maxWidth: "60%",
    width: "auto",
    height: "auto",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isFetching = useSelector(selectFetching);

  if (isLoggedIn) return <Redirect to="/" />;

  const renderLoginPage = () => {
    return (
      <div className={classes.loginWindow}>
        <img className={classes.logo} src="SC.png" alt="logo" />
        <Paper elevation={4}>
          <GoogleLoginComponent />
        </Paper>
      </div>
    );
  };

  return (
    <div className={classes.loginPage}>
      <Header title="Login" />
      {(isFetching && <CenteredSpinner />) || renderLoginPage()}
    </div>
  );
};

export default LoginPage;
