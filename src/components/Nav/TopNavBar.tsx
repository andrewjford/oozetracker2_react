import React from "react";
import { withStyles, WithStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  },
  appBar: {
    top: "auto",
    bottom: 0
  }
});

interface PassedProps extends WithStyles<typeof styles> {
  logout: () => any;
  isLoggedIn: string;
  theme: Theme;
}

function TopNavBar(props: PassedProps & RouteComponentProps) {
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

  return <div />;
}

export default withRouter(withStyles(styles, { withTheme: true })(TopNavBar));
