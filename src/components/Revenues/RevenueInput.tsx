import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputAdornment,
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
} from "@material-ui/core";
import { Revenue } from "../../interfaces/revenueInterfaces";

interface RevenueInputProps extends WithStyles<typeof styles> {
  revenue: Revenue;
  handleOnBlur: () => {};
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      alignSelf: "end",
    },
    amount: {
      gridColumn: "3",
      justifySelf: "right",
      alignSelf: "end",
    },
  });

const RevenueInput = (props: any) => {
  const formattedAmount = props.revenue.amount.includes(".")
    ? props.revenue.amount
    : `${props.revenue.amount}.00`;
  const [amount, setAmount] = useState(formattedAmount);
  const [isEditing, setIsEditing] = useState(false);
  const classes = props.classes;

  const handleOnBlur = (event: any) => {
    setIsEditing(false);
    props.handleOnBlur({
      ...props.revenue,
      amount,
    });
  };

  if (!isEditing) {
    return (
      <Typography
        variant="body2"
        className={classes.amount}
        onClick={() => setIsEditing(true)}
      >
        {amount}
      </Typography>
    );
  }

  return (
    <Typography variant="body2" className={classes.amount}>
      <FormControl className={classes.root} variant="standard">
        <Input
          id="amount"
          type="number"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          value={amount}
          onChange={(event) => setAmount(event.target.value as any)}
          autoFocus={true}
          onBlur={handleOnBlur}
        ></Input>
      </FormControl>
    </Typography>
  );
};

export default withStyles(styles)(RevenueInput);
