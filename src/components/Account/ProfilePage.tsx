import React from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import { List, ListItem } from "@material-ui/core";

function ProfilePage(props: any) {
  const loginLogoutLink = () => {
    if (props.isLoggedIn) {
      return (
        <ListItem button onClick={props.logout}>
          Logout
        </ListItem>
      );
    }

    return (
      <ListItem button>
        <Link className={props.classes.link} to="/login">
          Login
        </Link>
      </ListItem>
    );
  };

  return (
    <div className={props.classes.root}>
      <List component="nav" aria-label="my account">
        <ListItem button>
          <Link className={props.classes.link} to="/myaccount">
            My Account
          </Link>
        </ListItem>
        {loginLogoutLink()}
      </List>
    </div>
  );
}

const styles = createStyles({
  root: {
    flexGrow: 1,
    width: "100%"
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

export default withStyles(styles)(withRouter(ProfilePage));
