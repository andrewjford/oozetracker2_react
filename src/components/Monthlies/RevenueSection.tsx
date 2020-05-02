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
import React, { useState } from "react";
import { Revenue } from "../../interfaces/revenueInterfaces";
import RevenueLineItem from "../Revenues/RevenueLineItem";
import AddIcon from "@material-ui/icons/Add";
import { nullRevenue } from "./MonthlyTotals";

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
    revSectionTitle: {
      gridColumn: "1 / 2",
      display: "flex",
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
  const [newRevenues, setNewRevenues] = useState<Revenue[]>([]);
  const classes = props.classes;

  const addNewRevenue = (event: any) => {
    event.stopPropagation();
    setNewRevenues([
      ...newRevenues,
      {
        ...nullRevenue,
        date: props.date.toISOString(),
        tempId: `${props.date.toISOString()}${newRevenues.length}`,
      },
    ]);
  };

  const deleteNewRevenue = (tempId: string) => {
    setNewRevenues(
      newRevenues.filter((value: Revenue) => value.tempId !== tempId)
    );
  };

  const revenueLines = () => {
    return props.revenues.concat(newRevenues).map((revenue: Revenue) => {
      return (
        <RevenueLineItem
          revenue={revenue}
          key={`${props.date.toISOString()}${revenue.id}`}
          deleteLineItem={deleteNewRevenue}
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
          <div className={classes.revSectionTitle}>
            <Typography variant="subtitle1">Revenue</Typography>
            <AddIcon onClick={addNewRevenue} />
          </div>
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
