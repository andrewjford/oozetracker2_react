import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputAdornment,
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { Revenue } from "../../interfaces/revenueInterfaces";

interface RevenueInputProps extends WithStyles<typeof styles> {
  revenue: Revenue;
  handleOnBlur: () => {};
}

const styles = (theme: Theme) =>
  createStyles({
    input: {},
  });

const RevenueInput = (props: any) => {
  const [amount, setAmount] = useState(props.revenue.amount);
  const classes = props.classes;

  const handleOnBlur = (event: any) => {
    props.handleOnBlur({
      ...props.revenue,
      amount,
    });
  };

  return (
    <FormControl fullWidth className={classes.input} variant="standard">
      <Input
        id="amount"
        type="number"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        value={amount}
        onChange={(event) => setAmount(event.target.value as any)}
        onFocus={(event) => event.target.select()}
        onBlur={handleOnBlur}
      ></Input>
    </FormControl>
  );
};

export default withStyles(styles)(RevenueInput);
