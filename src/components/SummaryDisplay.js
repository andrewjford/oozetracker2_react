import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Loading from './Loading';

import ExpenseTable from './Expenses/ExpenseTable';

const styles = theme => ({
  mainHeader: {
    padding: "1rem 1rem 0"
  },
  paper: {
    gridColumnStart: 2,
    gridColumnEnd: 6
  },
  loadingSpinner: {
    gridColumnStart: 2,
    gridColumnEnd: 6,
    height: "20rem",
  }
});

class SummaryDisplay extends React.Component {
  render() {
    if (!this.props.expenses) {
      this.props.getBaseData();
      return (
        <div className={this.props.classes.loadingSpinner}>
          <Loading/>
        </div>
      );
    }
    const recentExpenses = this.props.expenses.slice(0,9);
    return (
      <Paper className={this.props.classes.paper}>
        <Typography className={this.props.classes.mainHeader} variant="h5" component="h3">
          Recent Expenses
        </Typography>
        <ExpenseTable expenses={recentExpenses}/>
      </Paper>
    );
  }
}

export default withStyles(styles)(SummaryDisplay);