import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { HamburgerMenu } from "./HamburgerMenu";
import { AccountMenu } from "./AccountMenu";

const styles = () => ({
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
