import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

import BackendCallout from './BackendCallout';

const styles = theme => ({
  table: {
    display: 'grid',
    gridTemplateColumns: '30% 30% auto',
  },
  container: {
    padding: '2rem'
  },
  col1: {
    gridColumn: '1 / 2'
  },
  col2: {
    gridColumn: '2'
  },
  header: {
    paddingBottom: '1rem'
  }
});

class ExpenseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.recordId,
      description: '',
      amount: 0,
      date: '',
      category: ''
    };
  }

  componentDidMount() {
    BackendCallout.getFromApi('/api/v1/expenses/' + this.state.id)
      .then(expense => {
        this.setState({...expense});
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <article className={this.props.classes.container}>
        <Typography variant="h5" component="h3" className={this.props.classes.header}>
          Expense Detail
        </Typography>
        <article className={this.props.classes.table}>
          <Typography variant="subtitle1" className={this.props.classes.col1}>Date</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col2}>{new Date(this.state.created_date).toLocaleDateString()}</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col1}>Description</Typography>
          <Typography variant="subtitle1" className={this.props.classes.row}>{this.state.description}</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col1}>Amount</Typography>
          <Typography variant="subtitle1" className={this.props.classes.row}>{this.state.amount}</Typography>
          <Typography variant="subtitle1" className={this.props.classes.col1}>Category</Typography>
          <Typography variant="subtitle1" className={this.props.classes.row}>{this.state.category}</Typography>
        </article>
      </article>
    )
  }
}
export default withStyles(styles)(ExpenseDetail);