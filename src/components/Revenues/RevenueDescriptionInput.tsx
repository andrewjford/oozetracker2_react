import React, { useState } from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  TextField,
  Button,
} from "@material-ui/core";

interface RevenueDescriptionInputProps extends WithStyles<typeof styles> {
  description: string;
  handleSubmit: (description: string) => any;
}

const styles = (theme: Theme) =>
  createStyles({
    item: {},
  });

const RevenueDescriptionInput = (props: RevenueDescriptionInputProps) => {
  const [description, setDescription] = useState(props.description);
  const classes = props.classes;

  return (
    <TextField
      type="text"
      value={description}
      onChange={(event) => setDescription(event.target.value)}
      label="Revenue Name"
      className={classes.item}
      autoFocus={true}
    />
  );
};

export default withStyles(styles)(RevenueDescriptionInput);
