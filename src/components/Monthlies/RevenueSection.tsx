import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Theme,
  createStyles,
  withStyles,
  Typography,
  ExpansionPanelDetails,
  WithStyles,
} from "@material-ui/core";
import React, { useCallback } from "react";
import RevenueInput from "../Revenues/RevenueInput";
import { Revenue } from "../../interfaces/revenueInterfaces";
import { useDispatch } from "react-redux";
import { createRevenue, updateRevenue } from "../../actions/revenueActions";

const styles = (theme: Theme) =>
  createStyles({
    revenueSummary: {
      padding: 0,
    },
    revenueDetail: {
      display: "inherit",
      padding: "0 1rem 1rem 1rem",
    },
    subtitle: {
      padding: "1rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "30% 70%",
      padding: "0 1rem 0 1rem",
      width: "100%",
    },
    wideGrid: {
      display: "grid",
      gridTemplateColumns: "30% 70%",
      width: "100%",
    },
    col1: {
      gridColumn: "1 / 2",
    },
    col2: {
      gridColumn: "2",
      justifySelf: "right",
    },
  });

interface RevenueSectionProps extends WithStyles<typeof styles> {
  revenues: Revenue[];
}

const RevenueSection = (props: RevenueSectionProps) => {
  const classes = props.classes;
  const dispatch = useDispatch();
  const editRevenue = useCallback(
    (revenue) => dispatch(updateRevenue(revenue)),
    [dispatch]
  );

  const handleRevenueChange = (revenue: Revenue) => {
    if (revenue.id) {
      editRevenue(revenue);
    } else {
      dispatch(createRevenue(revenue));
    }
  };

  const revenueLines = () => {
    return props.revenues.map((revenue: Revenue) => {
      return (
        <div className={classes.wideGrid}>
          <Typography variant="subtitle1" className={classes.col1}>
            {revenue.description}
          </Typography>
          <Typography variant="subtitle1" className={classes.col2}>
            <RevenueInput
              revenue={revenue}
              handleOnBlur={handleRevenueChange}
            />
          </Typography>
        </div>
      );
    });
  };

  const totalRevenue: string = props.revenues
    .reduce((sum, each) => {
      return sum + parseFloat(each.amount);
    }, 0)
    .toFixed(2);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        aria-controls="panel1a-content"
        className={classes.revenueSummary}
      >
        <div className={classes.grid}>
          <Typography variant="subtitle1" className={classes.col1}>
            Revenue
          </Typography>
          <Typography variant="subtitle1" className={classes.col2}>
            {totalRevenue}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.revenueDetail}>
        {revenueLines()}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(RevenueSection);
