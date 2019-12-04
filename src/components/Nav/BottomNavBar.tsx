import React from "react";
import PropTypes from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { HamburgerMenu } from "./HamburgerMenu";
import { AccountMenu } from "./AccountMenu";

const styles = createStyles({
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
  },
  appBar: {
    top: "auto",
    bottom: 0
  }
});

const BottomNavBar = (props: any) => {
  const notSmallScreen = useMediaQuery(props.theme.breakpoints.up("sm"));
  const { classes } = props;

  if (notSmallScreen) {
    return <div />;
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
