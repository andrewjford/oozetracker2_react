import React, { useState } from "react";
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
  const [revenue, setRevenue] = useState(props.revenue);
  const classes = props.classes;

  return (
    <div className={classes.root}>
      {/* <Typography variant="subtitle1" className={classes.col1}> */}
      <RevenueDescriptionInput
        description={revenue.description}
        handleSubmit={(description: string) => {
          setRevenue({ ...revenue, description });
        }}
      />
      {/* </Typography> */}
      <Typography variant="subtitle1" className={classes.amount}>
        <RevenueInput
          revenue={revenue}
          handleOnBlur={(updatedRev: Revenue) => {
            setRevenue(updatedRev);
          }}
        />
      </Typography>
    </div>
  );
};

export default withStyles(styles)(RevenueLineItem);
