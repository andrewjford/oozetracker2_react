import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  mainHeader: {
    padding: "1rem 1rem 0"
  },
  summary: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "40px 50px auto 50px 40px"
  },
  paper: {
    gridColumnStart: 2,
    gridColumnEnd: 5
  }
});

class MonthlyTotals extends React.Component {

  render() {
    const expenses = this.props.state.expenses.map((expense) => {
      return {
        ...expense,
        categoryName: this.props.state.expenseCategoriesMap[expense.category]
      }
    });
    
    return (
      <div className={this.props.classes.summary}>
      <Paper className={this.props.classes.paper}>
        <Typography className={this.props.classes.mainHeader} variant="h5" component="h3">
          Monthly Summary
        </Typography>
        
      </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MonthlyTotals);