import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import AlertIcon from "@material-ui/icons/Info";

const ErrorDisplay = props => {
  const lines = props.errors.map(error => {
    return (
      <div className={props.classes.row} key={error}>
        <ErrorIcon className={props.classes.icon} />
        <Typography
          variant="body1"
          color="error"
          className={props.classes.errorText}
        >
          {error}
        </Typography>
      </div>
    );
  });

  const notifications = () => {
    if (props.notifications) {
      return props.notifications.map(notification => {
        return (
          <div className={props.classes.row} key={notification}>
            <AlertIcon className={props.classes.icon} />
            <Typography
              variant="body1"
              color="default"
              className={props.classes.notificationText}
            >
              {notification}
            </Typography>
          </div>
        );
      });
    }
  
    return null;
  };

  if (lines.length > 0 || notifications.length > 0) {
    return (
      <div className={props.classes.errorBox}>
        {notifications()}
        {lines}
      </div>
    );
  } else {
    return null;
  }
};

const styles = theme => ({
  errorBox: {
    backgroundColor: "#f3f3f3",
    padding: "0.5rem"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "5% 95%",
    gridColumnGap: "0.5rem"
  },
  errorText: {
    alignSelf: "center",
    justifySelf: "start",
    gridColumnStart: 2,
    gridColumnEnd: 2
  },
  notificationText: {
    alignSelf: "center",
    justifySelf: "start",
    gridColumnStart: 2,
    gridColumnEnd: 2
  },
  icon: {
    alignSelf: "center",
    gridColumnStart: 1,
    gridColumnEnd: 2,
    color: "red"
  }
});

export default withStyles(styles)(ErrorDisplay);
