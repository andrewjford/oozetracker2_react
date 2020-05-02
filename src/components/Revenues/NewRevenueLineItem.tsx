import React, { useState } from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  TextField,
  FormControl,
  Input,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { Revenue } from "../../interfaces/revenueInterfaces";
import { useDispatch } from "react-redux";
import { createRevenue } from "../../actions/revenueActions";
import DeleteIcon from "@material-ui/icons/Delete";

interface NewRevenueLineItemProps extends WithStyles<typeof styles> {
  revenue: Revenue;
  deleteLineItem: (tempId: string) => any;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      width: "100%",
      padding: "0.25rem 0",
      alignContent: "end",
      gridTemplateColumns: "30% 35% auto 20% 10%",
    },
    col1: {
      gridColumn: "1",
    },
    cancelIcon: {
      gridColumn: "3",
      display: "grid",
      alignContent: "end",
      justifyContent: "end",
    },
    button: {
      gridColumn: "5",
      display: "grid",
      alignSelf: "end",
    },
    amount: {
      gridColumn: "4",
      alignSelf: "end",
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  });

const NewRevenueLineItem = (props: NewRevenueLineItemProps) => {
  const [description, setDescription] = useState("new revenue");
  const [amount, setAmount] = useState("0");

  const classes = props.classes;
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (amount === "") {
      return;
    }
    handleDelete();
    dispatch(
      createRevenue({
        description,
        amount,
        date: props.revenue.date,
      })
    );
  };

  const handleDelete = () => {
    if (props.revenue.tempId) {
      props.deleteLineItem(props.revenue.tempId);
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        type="text"
        value={description}
        onChange={(event: any) => setDescription(event.target.value)}
        label="Revenue Name"
        autoFocus={true}
        className={classes.col1}
      />

      <div className={classes.cancelIcon}>
        <DeleteIcon onClick={handleDelete} />
      </div>

      <FormControl className={classes.amount} variant="standard">
        <Input
          id="amount"
          type="number"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          value={amount}
          onChange={(event) => setAmount(event.target.value as any)}
        ></Input>
      </FormControl>
      <div className={classes.button}>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(NewRevenueLineItem);
