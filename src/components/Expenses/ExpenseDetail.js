import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';

import { Typography, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

import { getExpense, deleteExpense } from '../../actions/expenseActions';

const styles = theme => ({
  table: {
    display: 'grid',
    gridTemplateColumns: '30% 70%',
    padding: '1rem 2rem 3rem'
  },
  row1col1: {
    alignSelf: 'center',
    gridColumn: '1 / 2',
    paddingBottom: '1rem',
  },
  row1col2: {
    justifySelf: 'right',
    gridColumn: '2',
    paddingBottom: '1rem',
  },
  col1: {
    gridColumn: '1 / 2'
  },
  col2: {
    gridColumn: '2',
    justifySelf: 'right',
  },
  header: {
  },
  fab: {
    margin: theme.spacing.unit,
  },
  paper: {
    gridColumnStart: 2,
    gridColumnEnd: 4,
    [theme.breakpoints.down('sm')]: {
      gridColumn: "2 / 5",
    },
    [theme.breakpoints.down('xs')]: {
      gridColumn: "1 / -1",
    },
  },
});

class ExpenseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (Object.keys(this.props.expense).length === 1) {
      this.props.getExpense(this.props.expense.id);
    }
  }

  handleEditClick = () => {
    this.setState({redirect: `/expenses/${this.props.expense.id}/edit`})
  }

  handleDeleteClick = () => {
    this.props.deleteExpense(this.props.expense.id);
    this.setState({redirect: "/"});
  }

  redirect = () => {
    const {redirect} = this.state;
    if (!!redirect) {
      return (<Redirect to={redirect}/>)
    }
  }

  render() {
    const expense = this.props.expense;
    return (
      <Paper className={this.props.classes.paper}>
        {this.redirect()}
        <article className={this.props.classes.table}>
          <div className={this.props.classes.row1col1}>
            <Typography variant="h5" component="h3" className={this.props.classes.header}>
              Expense Detail
            </Typography>
          </div>
          <div className={this.props.classes.row1col2}>
            <Fab size="small" aria-label="Edit" className={this.props.classes.fab} onClick={this.handleEditClick}>
              <Link to={`/expenses/${expense.id}/edit`}>
                <EditIcon/>
              </Link>
            </Fab>
            <Fab size="small" aria-label="Delete" className={this.props.classes.fab} onClick={this.handleDeleteClick}>
              <DeleteIcon/>
            </Fab>
          </div>
          <Typography variant="subtitle1" className={this.props.classes.col1}>Date</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col2}>{new Date(expense.date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col1}>Description</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col2}>{expense.description}</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col1}>Amount</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col2}>{expense.amount}</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col1}>Category</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col2}>{this.props.categoriesMap[expense.category_id].name}</Typography>
        </article>
      </Paper>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getExpense,
    deleteExpense,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(ExpenseDetail));