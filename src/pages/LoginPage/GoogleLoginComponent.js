import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { login } from "./loginSlice";

const useStyles = makeStyles(theme => ({
  loginButton: { backgroundColor: theme.palette.primary.main }
}));

const GoogleLoginComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const responseGoogle = response => {
    console.log(response);
  };

  const loginSuccess = response => {
    dispatch(login(response.profileObj));
  };

  return (
    <GoogleLogin
      clientId="409708898302-vl10ip96lo2fav7ia658s7o1a658c6sn.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={loginSuccess}
      onFailure={responseGoogle}
      className={classes.loginButton}
      isSignedIn={true}
    />
  );
};

export default GoogleLoginComponent;
