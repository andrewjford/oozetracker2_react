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
import { Link, withRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";

const styles = theme => ({
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
});

const HamburgerMenu = props => {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Add Expense",
      href: "/expenses/new"
    },
    {
      label: "Categories",
      href: "/categories"
    },
    {
      label: "Monthly Totals",
      href: "/monthly"
    }
  ];

  const menuItemsDisplay = menuItems.map(menuItem => {
    return (
      <MenuItem onClick={handleClose}>
        <Link to={menuItem.href} className={classes.link}>
          {menuItem.label}
        </Link>
      </MenuItem>
    );
  });

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.link}
        color="inherit"
        aria-label="menu"
        onClick={openMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="hamburger-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItemsDisplay}
      </Menu>
    </div>
  );
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
    props.history.push("/");
  };

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

function ButtonAppBar(props) {
  const notSmallScreen = useMediaQuery(props.theme.breakpoints.up("sm"));
  const { classes } = props;

  if (notSmallScreen) {
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <HamburgerMenu {...props} />
          <AccountMenu {...props} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(
  withStyles(styles, { withTheme: true })(ButtonAppBar)
);
