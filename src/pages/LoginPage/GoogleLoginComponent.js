import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { login } from "./loginSlice";
import { setChats } from "../ChatListPage/chatsSlice";
import { getAccessToken, getMe, getMyChats } from "../../api/rest";

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();

  const responseGoogle = response => {
    console.log(response);
  };

  const loginSuccess = response => {
    const token = response.tokenId;

    getAccessToken(token, "google").then(response => {
      const jwt = response.data.access_token;
      const tokenType = response.data.token_type;

      const accessToken = `${tokenType} ${jwt}`;

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        getMe().then(res1 => {
          getMyChats().then(res2 => {
            dispatch(setChats(res2.data));
            dispatch(login(res1.data));
          });
        });
      }
    });
  };

  return (
    <GoogleLogin
      clientId="409708898302-vl10ip96lo2fav7ia658s7o1a658c6sn.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={loginSuccess}
      onFailure={responseGoogle}
      isSignedIn={true}
    />
  );
};

export default GoogleLoginComponent;
