import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Theme,
  createStyles,
  withStyles,
  Typography,
  ExpansionPanelDetails,
} from "@material-ui/core";
import React from "react";
import { MonthlyLineItemInterface } from "../../interfaces/expenseInterfaces";
import RevenueInput from "../Revenues/RevenueInput";

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

const RevenueSection = (props: any) => {
  const classes = props.classes;

  const revenueLine: any = {
    sum: 1000.0,
    id: 1,
    name: "Revenue",
  };

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
            {revenueLine.sum}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.wideGrid}>
          <Typography variant="subtitle1" className={classes.col1}>
            Revenue
          </Typography>
          <Typography variant="subtitle1" className={classes.col2}>
            <RevenueInput initialValue={revenueLine.sum} />
          </Typography>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(RevenueSection);
