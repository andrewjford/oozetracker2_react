import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Loading from './Loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchRecentExpenses } from '../actions/expenseActions';
import { fetchCategories } from '../actions/categoriesActions';
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
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  hasCategories = () => {
    return Object.keys(this.props.categoriesMap).length === 0 && this.props.categoriesMap.constructor === Object;
  }

  componentDidMount() {
    if (
      !this.hasCategories ||
      !this.props.expenses
    ) {
      Promise.all([
        this.props.fetchCategories(),
        this.props.fetchRecentExpenses()
      ]).then(() => {
        this.setState({ isLoading: false });
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className={this.props.classes.loadingSpinner}>
          <Loading/>
        </div>
      );
    }

    const recentExpenses = this.props.expenses.map(expense => {
      return {
        ...expense,
        category: this.props.categoriesMap[expense.category_id],
      }
    }).slice(0,9);

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

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.expenses,
    categoriesMap: state.categories.categoriesMap
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRecentExpenses,
    fetchCategories,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SummaryDisplay));