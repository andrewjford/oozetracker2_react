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
import RevenueInput from "../Revenues/RevenueInput";
import { RevenuesMap, Revenue } from "../../interfaces/revenueInterfaces";

const styles = (theme: Theme) =>
  createStyles({
    revenueSummary: {
      padding: 0,
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
  revenues: Revenue[] | undefined;
}

const nullRevenue: Revenue = {
  amount: "0",
  description: "",
  date: "",
};

const RevenueSection = (props: RevenueSectionProps) => {
  const classes = props.classes;

  const revenueLine: Revenue =
    (props.revenues && props.revenues[0]) || nullRevenue;

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
            {revenueLine.amount}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.wideGrid}>
          <Typography variant="subtitle1" className={classes.col1}>
            Revenue
          </Typography>
          <Typography variant="subtitle1" className={classes.col2}>
            <RevenueInput initialValue={revenueLine.amount} />
          </Typography>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(RevenueSection);
