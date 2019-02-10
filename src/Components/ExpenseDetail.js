import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

import BackendCallout from './BackendCallout';
import ExpenseForm from './ExpenseForm';

const styles = theme => ({
  table: {
    display: 'grid',
    gridTemplateColumns: '30% 30% auto',
    padding: '2rem'
  },
  col1: {
    gridColumn: '1 / 2'
  },
  col2: {
    gridColumn: '2'
  },
  header: {
  },
  fab: {
    margin: theme.spacing.unit,
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

  container = () => {
    const expense = this.state.expense;
    if (this.state.showEdit) {
      return (
        <div>
          <ExpenseForm expenseCategories={this.state.expenseCategories} afterSubmit={this.updateExpense}
                      expense={this.state.expense}/>
        </div>
      );
    } else {
      return (
        <article className={this.props.classes.table}>
          <div className={this.props.classes.col1}>
            <Typography variant="h5" component="h3" className={this.props.classes.header}>
              Expense Detail
            </Typography>
          </div>
          <div className={this.props.classes.col2}>
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
          <Typography variant="subtitle1" className={this.props.classes.row}>{expense.description}</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col1}>Amount</Typography>
          <Typography variant="subtitle1" className={this.props.classes.row}>{expense.amount}</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col1}>Category</Typography>
          <Typography variant="subtitle1" className={this.props.classes.row}>{expense.category}</Typography>
          
        </article>
      );
    }
  }

  render() {
    return (
      <div>
        {this.container()}
      </div>
    )
  }
}
export default withStyles(styles)(ExpenseDetail);