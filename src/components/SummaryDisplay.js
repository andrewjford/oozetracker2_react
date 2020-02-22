import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

import ExpenseTable from "./Expenses/ExpenseTable";

const styles = theme => ({
  mainHeader: {
    padding: "1rem 1rem 0"
  },
  paper: {
    gridColumnStart: 2,
    gridColumnEnd: 6,
    [theme.breakpoints.down("xs")]: {
      gridColumn: "1 / -1"
    }
  },
  loadingSpinner: {
    gridColumnStart: 2,
    gridColumnEnd: 6,
    height: "20rem"
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class SummaryDisplay extends React.Component {
  render() {
    const recentExpenses = Object.values(this.props.expenses)
      .map(expense => {
        return {
          ...expense,
          dateTyped: new Date(expense.date),
          category: this.props.categoriesMap[expense.category_id]
        };
      })
      .sort((a, b) => {
        return b.dateTyped - a.dateTyped;
      })
      .slice(0, 9);

    return (
      <Paper className={this.props.classes.paper}>
        <Typography
          className={this.props.classes.mainHeader}
          variant="h5"
          component="h3"
        >
          Recent Expenses
        </Typography>
        <section className={this.props.classes.tableWrapper}>
          <ExpenseTable expenses={recentExpenses} />
        </section>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    expenses: state.expenses.expenses,
    categoriesMap: state.categories.categoriesMap
  };
};

export default connect(mapStateToProps)(withStyles(styles)(SummaryDisplay));
