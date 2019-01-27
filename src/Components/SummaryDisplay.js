import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ExpenseTable from './ExpenseTable';

const styles = theme => ({
  mainHeader: {
    padding: "1rem 1rem 0"
  }
});

class SummaryDisplay extends React.Component {

  render() {
    const expenses = this.props.state.expenses.map((expense) => {
      return {
        ...expense,
        categoryName: this.props.state.expenseCategoriesMap[expense.category]
      }
    });
    
    return (
      <div className="summary">
        <Typography className={this.props.classes.mainHeader} variant="h5" component="h3">
          Recent Expenses
        </Typography>
        <ExpenseTable expenses={expenses}/>
      </div>
    );
  }
}

export default withStyles(styles)(SummaryDisplay);