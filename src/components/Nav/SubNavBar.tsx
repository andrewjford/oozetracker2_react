import React from "react";
import {
  Button,
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => {
  return createStyles({
    link: {
      textDecoration: "none",
      color: "inherit"
    },
    container: {
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
};

interface PassedProps extends WithStyles<typeof styles> {
  pathName: string;
}

const SubNavBar = (props: PassedProps) => {
  const { classes } = props;

  if (props.pathName === "/") {
    return (
      <div className={classes.container}>
        <Link className={classes.link} to="/expenses/new">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            New Expense
          </Button>
        </Link>
      </div>
    );
  }

  if (props.pathName.startsWith("/expenses/")) {
    return (
      <div className={classes.container}>
        <Link className={classes.link} to="/">
          <Button variant="outlined" color="primary" className={classes.button}>
            Go Back
          </Button>
        </Link>
      </div>
    );
  }

  return null;
};

export default withStyles(styles)(SubNavBar);
