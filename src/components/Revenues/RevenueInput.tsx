import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputAdornment,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    input: {},
  });

const RevenueInput = (props: any) => {
  const [amount, setAmount] = useState(props.initialValue);
  const classes = props.classes;

  return (
    <FormControl fullWidth className={classes.input} variant="standard">
      <Input
        id="amount"
        type="number"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        value={amount}
        onChange={(event) => setAmount(event.target.value as any)}
        onFocus={(event) => event.target.select()}
      ></Input>
    </FormControl>
  );
};

export default withStyles(styles)(RevenueInput);
