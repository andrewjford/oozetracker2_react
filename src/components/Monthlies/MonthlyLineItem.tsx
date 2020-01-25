import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

export const MonthlyLineItem = (props: any) => {
  return (
    <TableRow onClick={() => props.handleRowClick(props.lineItem.id)}>
      <TableCell>{props.lineItem.name}</TableCell>
      <TableCell align="right">{props.lineItem.sum}</TableCell>
    </TableRow>
  );
};
