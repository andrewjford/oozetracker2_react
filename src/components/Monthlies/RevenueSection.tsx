import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Theme,
  createStyles,
  withStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { MonthlyLineItemInterface } from "../../interfaces/expenseInterfaces";

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
    col1: {
      gridColumn: "1 / 2",
    },
    col2: {
      gridColumn: "2",
      justifySelf: "right",
    },
  });

const RevenueSection = (props: any) => {
  const classes = props.classes;

  const revenueLine: MonthlyLineItemInterface = {
    sum: "1,000.00",
    id: 1,
    name: "Revenue",
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.revenueSummary}
      >
        <div className={classes.grid}>
          <Typography variant="subtitle1" className={classes.col1}>
            Revenue
          </Typography>
          <Typography variant="subtitle1" className={classes.col2}>
            {revenueLine.sum}
          </Typography>
        </div>
      </ExpansionPanelSummary>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(RevenueSection);
