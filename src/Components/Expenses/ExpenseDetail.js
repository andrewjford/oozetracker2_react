import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

import BackendCallout from '../../services/BackendCallout';
import ExpenseForm from './ExpenseForm';

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
    gridColumnEnd: 4
  },
});

class ExpenseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        id: props.recordId,
        description: '',
        amount: 0,
        date: '',
        category: ''
      },
      showEdit: false,
      expenseCategories: props.expenseCategories
    };
  }

  componentDidMount() {
    BackendCallout.getFromApi('/api/v1/expenses/' + this.state.expense.id)
      .then(expense => {
        this.setState({expense});
      })
      .catch(error => console.log(error));
  }

  handleEditClick = () => {
    this.setState({showEdit: true});
  }

  handleDeleteClick = () => {
    BackendCallout.delete('/api/v1/expenses/' + this.state.expense.id)
      .then(response => {
        this.props.updateExpenseState((expenses) => {
          return expenses.filter((expense) => expense.id !== this.state.expense.id);
        });
        // this.props.redirectTo('/');
      });
  }

  updateExpense = (updatedExpense) => {
    this.setState({
      expense : updatedExpense,
      showEdit: false
    });
  }

  render() {
    const expense = this.state.expense;
    if (this.state.showEdit) {
      return (
        <ExpenseForm expenseCategories={this.state.expenseCategories} afterSubmit={this.updateExpense}
                    expense={this.state.expense}/>
      );
    } else {
      return (
        <Paper className={this.props.classes.paper}>
          <article className={this.props.classes.table}>
            <div className={this.props.classes.row1col1}>
              <Typography variant="h5" component="h3" className={this.props.classes.header}>
                Expense Detail
              </Typography>
            </div>
            <div className={this.props.classes.row1col2}>
              <Fab size="small" aria-label="Edit" className={this.props.classes.fab} onClick={this.handleEditClick}>
                <EditIcon/>
              </Fab>
              <Fab size="small" aria-label="Delete" className={this.props.classes.fab} onClick={this.handleDeleteClick}>
                <DeleteIcon/>
              </Fab>
            </div>
            <Typography variant="subtitle1" className={this.props.classes.col1}>Date</Typography>
            <Typography variant="subtitle1" className={this.props.classes.col2}>{new Date(expense.date).toLocaleDateString()}</Typography>
            <Typography variant="subtitle1" className={this.props.classes.col1}>Description</Typography>
            <Typography variant="subtitle1" className={this.props.classes.col2}>{expense.description}</Typography>
            <Typography variant="subtitle1" className={this.props.classes.col1}>Amount</Typography>
            <Typography variant="subtitle1" className={this.props.classes.col2}>{expense.amount}</Typography>
            <Typography variant="subtitle1" className={this.props.classes.col1}>Category</Typography>
            <Typography variant="subtitle1" className={this.props.classes.col2}>{expense.name}</Typography>
          </article>
        </Paper>
      );
    }
  }
}
export default withStyles(styles)(ExpenseDetail);