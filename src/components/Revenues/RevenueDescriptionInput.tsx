import React, { useState } from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  TextField,
  Typography,
} from "@material-ui/core";

interface RevenueDescriptionInputProps extends WithStyles<typeof styles> {
  description: string;
  handleSubmit: (description: string) => any;
  handleIsEditing: (isEditing: boolean) => any;
}

const styles = (theme: Theme) =>
  createStyles({
    col1: {
      gridColumn: "1 / 2",
    },
  });

const RevenueDescriptionInput = (props: RevenueDescriptionInputProps) => {
  const [description, setDescription] = useState(props.description);
  const [editing, setEditing] = useState(false);
  const classes = props.classes;

  const changeEditing = (newEdit: boolean) => {
    setEditing(newEdit);
    props.handleIsEditing(newEdit);
  };

  if (!editing) {
    return (
      <Typography
        variant="body2"
        className={classes.col1}
        onClick={() => changeEditing(true)}
      >
        {description}
      </Typography>
    );
  }

  return (
    <TextField
      type="text"
      value={description}
      onChange={(event) => setDescription(event.target.value)}
      label="Revenue Name"
      autoFocus={true}
      onBlur={() => {
        changeEditing(false);
        props.handleSubmit(description);
      }}
    />
  );
};

export default withStyles(styles)(RevenueDescriptionInput);
