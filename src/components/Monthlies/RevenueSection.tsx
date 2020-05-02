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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NewRevenueLineItem from "../Revenues/NewRevenueLineItem";

const styles = (theme: Theme) =>
  createStyles({
    revenueSummary: {
      padding: 0,
    },
    revenueTitle: {
      fontSize: "0.875rem",
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
    revenueAmount: {
      gridColumn: "2",
      justifySelf: "right",
      fontSize: "0.875rem",
    },
    addIcon: {
      paddingLeft: "0.25rem",
    },
  });

interface RevenueSectionProps extends WithStyles<typeof styles> {
  revenues: Revenue[];
  date: Date;
}

export const nullRevenue: Revenue = {
  amount: "0",
  description: "enter revenue description",
  date: "",
};

const RevenueSection = (props: RevenueSectionProps) => {
  const [newRevenues, setNewRevenues] = useState<Revenue[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
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
    return props.revenues.map((revenue: Revenue) => {
      return <RevenueLineItem revenue={revenue} key={revenue.id} />;
    });
  };

  const newRevenueLines = () => {
    return newRevenues.map((revenue: Revenue) => {
      return (
        <NewRevenueLineItem
          revenue={revenue}
          key={revenue.tempId}
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

  const addSection = () => {
    if (expanded) {
      return (
        <AddCircleIcon
          onClick={addNewRevenue}
          className={classes.addIcon}
          color="primary"
        />
      );
    }

    return;
  };

  return (
    <ExpansionPanel
      onChange={(event: object, expanded: boolean) => setExpanded(expanded)}
    >
      <ExpansionPanelSummary
        aria-controls="panel1a-content"
        className={classes.revenueSummary}
      >
        <div className={classes.grid}>
          <div className={classes.revSectionTitle}>
            <Typography variant="subtitle1" className={classes.revenueTitle}>
              <b>Revenue</b>
            </Typography>
            {addSection()}
          </div>
          <Typography variant="subtitle1" className={classes.revenueAmount}>
            <b>{totalRevenue}</b>
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.revenueDetail}>
        {revenueLines()}
        {newRevenueLines()}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(RevenueSection);
