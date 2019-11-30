import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { Menu, MenuItem, IconButton } from "@material-ui/core";

const AccountMenu = (props: any) => {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const openAccountMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  const logout = () => {
    setAnchorEl(null);
    props.logout();
    props.history.push("/");
  };

  const menus = (props: any) => {
    if (!props.isLoggedIn) {
      return (
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link className={props.classes.link} to="/login">
              Login
            </Link>
          </MenuItem>
        </Menu>
      );
    } else {
      return (
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link className={props.classes.link} to="/myaccount">
              My account
            </Link>
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      );
    }
  };

  return (
    <div>
      <IconButton
        className={classes.link}
        aria-label="account"
        onClick={openAccountMenu}
      >
        <AccountIcon />
      </IconButton>
      {menus(props)}
    </div>
  );
};

export { AccountMenu };
