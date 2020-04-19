import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { useGoogleLogout } from "react-google-login";

import {
  selectUserName,
  selectUserImageUrl,
  logout,
} from "../../pages/LoginPage/loginSlice";
import { reset } from "../../pages/ChatListPage/chatsSlice";

const useStyles = makeStyles((theme) => ({
  profileMenu: {
    marginRight: "-1rem",
  },
  avatar: {
    marginLeft: "1rem",
    height: "3rem",
    width: "3rem",
  },
  button: {
    color: "white",
    textTransform: "none",
  },
}));

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const userName = useSelector(selectUserName);
  const imageUrl = useSelector(selectUserImageUrl);
  const dispatch = useDispatch();

  const { signOut, loaded } = useGoogleLogout({
    jsSrc: "https://apis.google.com/js/api.js",
    onFailure: () => {
      console.log("Error: Failed to log out?");
    },
    clientId:
      "409708898302-vl10ip96lo2fav7ia658s7o1a658c6sn.apps.googleusercontent.com",
    onLogoutSuccess: () => {
      console.log("Logged out!");
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (e) => {
    localStorage.removeItem("access_token");
    dispatch(logout());
    dispatch(reset());
    signOut();
    setAnchorEl(null);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.profileMenu}>
      <Button
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
      >
        {/*<Typography variant="body1">{userName}</Typography>*/}

        <Avatar className={classes.avatar} alt={userName} src={imageUrl} />
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorReference="anchorEl"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleLogout}>Sign out</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
