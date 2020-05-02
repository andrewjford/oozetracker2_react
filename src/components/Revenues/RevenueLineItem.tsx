import React from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
} from "@material-ui/core";
import { Revenue } from "../../interfaces/revenueInterfaces";
import RevenueDescriptionInput from "./RevenueDescriptionInput";
import RevenueInput from "./RevenueInput";
import { useDispatch } from "react-redux";
import { createRevenue, updateRevenue } from "../../actions/revenueActions";

interface RevenueLineItemProps extends WithStyles<typeof styles> {
  revenue: Revenue;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gridTemplateColumns: "30% 70%",
      width: "100%",
    },
    col1: {
      gridColumn: "1 / 2",
    },
    amount: {
      gridColumn: "2",
      justifySelf: "right",
      alignSelf: "end",
    },
  });

const RevenueLineItem = (props: RevenueLineItemProps) => {
  const classes = props.classes;
  const dispatch = useDispatch();

  const handleRevenueChange = (revenue: Revenue) => {
    if (revenue.id) {
      dispatch(updateRevenue(revenue));
    } else {
      dispatch(createRevenue(revenue));
    }
  };

  const revenue = props.revenue;

  return (
    <div className={classes.root}>
      <RevenueDescriptionInput
        description={revenue.description}
        handleSubmit={(description: string) => {
          handleRevenueChange({ ...revenue, description });
        }}
      />
      <Typography variant="subtitle1" className={classes.amount}>
        <RevenueInput
          revenue={revenue}
          handleOnBlur={(updatedRev: Revenue) => {
            handleRevenueChange(updatedRev);
          }}
        />
      </Typography>
    </div>
  );
};

export default withStyles(styles)(RevenueLineItem);
