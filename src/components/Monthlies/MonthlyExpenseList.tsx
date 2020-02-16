import React from "react";
import { Link } from "react-router-dom";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import HoverTableRow from "../HoverTableRow";
import { Expense } from "../../interfaces/expenseInterfaces";

const styles = (theme: Theme) => ({
  link: {
    textDecoration: "none",
    color: "black"
  }
});

interface PassedProps extends WithStyles<typeof styles> {
  expenses: Expense[];
}

class MonthlyExpenseList extends React.Component<PassedProps> {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.expenses.map(expense => (
            <HoverTableRow key={expense.id}>
              <TableCell>
                {new Date(expense.date).toLocaleDateString("en-US", {
                  timeZone: "UTC"
                })}
              </TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell component="th" scope="row">
                {expense.category.name}
              </TableCell>
              <TableCell align="right">
                <Link
                  to={"/expenses/" + expense.id}
                  className={this.props.classes.link}
                >
                  {expense.amount}
                </Link>
              </TableCell>
            </HoverTableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(MonthlyExpenseList);
