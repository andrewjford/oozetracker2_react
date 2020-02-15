import React from "react";
import {
  TableRow,
  TableCell,
  createStyles,
  WithStyles,
  withStyles,
  Theme
} from "@material-ui/core";
import { MonthlyLineItemInterface } from "../../types/expenseTypes";

const styles = (theme: Theme) =>
  createStyles({
    rowLink: {
      color: "orange",
      "&:hover": {
        // @ts-ignore
        backgroundColor: theme.palette.primary.alt1,
        cursor: "pointer"
      }
    }
  });

interface PassedProps extends WithStyles<typeof styles> {
  lineItem: MonthlyLineItemInterface;
  handleRowClick: (id: number) => void;
}

const MonthlyLineItem = (props: PassedProps) => {
  return (
    <TableRow
      onClick={() => props.handleRowClick(props.lineItem.id)}
      className={props.classes.rowLink}
    >
      <TableCell>{props.lineItem.name}</TableCell>
      <TableCell align="right">{props.lineItem.sum}</TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(MonthlyLineItem);
