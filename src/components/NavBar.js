import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
};

const AccountMenu = props => {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const openAccountMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  const logout = () => {
    setAnchorEl(null);
    props.logout();
  }

  const menus = props => {
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
            <Link className={props.classes.link} to="/monthly">
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
          <MenuItem onClick={handleClose}>My account</MenuItem>
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

function ButtonAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={`${classes.grow} ${classes.link}`}>
            <Typography variant="h6" color="inherit">
              Cash Tracker
            </Typography>
          </Link>
          <Link className={classes.link} to="/expenses/new">
            <Button color="inherit">Add Expense</Button>
          </Link>
          <Link className={classes.link} to="/categories">
            <Button color="inherit">Categories</Button>
          </Link>
          <Link className={classes.link} to="/monthly">
            <Button color="inherit">Monthly Totals</Button>
          </Link>
          <AccountMenu {...props} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
