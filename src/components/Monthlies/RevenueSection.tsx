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
import React from "react";
import { Revenue } from "../../interfaces/revenueInterfaces";
import RevenueLineItem from "../Revenues/RevenueLineItem";

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
  date: Date;
}

const RevenueSection = (props: RevenueSectionProps) => {
  const classes = props.classes;

  const revenueLines = () => {
    return props.revenues.map((revenue: Revenue) => {
      return (
        <RevenueLineItem
          revenue={revenue}
          key={`${props.date.toISOString()}${revenue.id}`}
        />
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
