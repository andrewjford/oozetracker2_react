import React from "react";
import PropTypes from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import TocIcon from "@material-ui/icons/Toc";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

import {
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  AppBar,
  Button,
  Theme
} from "@material-ui/core";
import { HamburgerMenu } from "./HamburgerMenu";
import { AccountMenu } from "./AccountMenu";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      position: "fixed",
      bottom: 0
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
    },
    appBar: {
      top: "auto",
      bottom: 0
    },
    newExpense: {
      padding: "0.5rem 0",
      textAlign: "center",
      borderBottom: "1px solid " + theme.palette.primary.main,
      borderTop: "1px solid " + theme.palette.primary.main,
      backgroundColor: "white"
    },
    button: {
      borderRadius: "0.1rem"
    }
  });

const NewExpenseBar = (props: any) => {
  const onHomePage = props.location.pathname === "/";

  if (onHomePage) {
    return (
      <div className={props.classes.newExpense}>
        <Link className={props.classes.link} to="/expenses/new">
          <Button
            variant="contained"
            color="primary"
            className={props.classes.button}
          >
            New Expense
          </Button>
        </Link>
      </div>
    );
  }
};

const BottomNavBar = (props: any) => {
  const [value, setValue] = React.useState(0);
  const biggerScreen = useMediaQuery(props.theme.breakpoints.up("sm"));
  const smallerScreen = useMediaQuery(props.theme.breakpoints.up("xs"));
  const { classes } = props;

  if (biggerScreen) {
    return null;
  }

  if (smallerScreen) {
    return (
      <div className={classes.root}>
        {NewExpenseBar(props)}
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            to="/"
          />
          <BottomNavigationAction
            label="Summary"
            icon={<MenuBookIcon />}
            component={Link}
            to="/monthly"
          />
          <BottomNavigationAction
            label="Categories"
            icon={<TocIcon />}
            component={Link}
            to="/categories"
          />
          <BottomNavigationAction
            label="Profile"
            icon={<AccountCircleIcon />}
            component={Link}
            to="/profile"
          />
        </BottomNavigation>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <HamburgerMenu {...props} />
          <div className={classes.grow} />
          <AccountMenu {...props} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

BottomNavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withRouter(BottomNavBar)
);
