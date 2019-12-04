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

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";

const styles = createStyles({
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
  }
});

const BottomNavBar = (props: any) => {
  const [value, setValue] = React.useState(0);
  const notSmallScreen = useMediaQuery(props.theme.breakpoints.up("sm"));
  const { classes } = props;

  if (notSmallScreen) {
    return null;
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
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
  );
};

BottomNavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withRouter(BottomNavBar)
);
