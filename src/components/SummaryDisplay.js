import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import ExpenseTable from './Expenses/ExpenseTable';

const styles = theme => ({
  mainHeader: {
    padding: "1rem 1rem 0"
  },
  paper: {
    gridColumnStart: 2,
    gridColumnEnd: 6
  }
});

class SummaryDisplay extends React.Component {
  render() {
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