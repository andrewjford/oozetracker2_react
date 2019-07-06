import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import HoverTableRow from '../HoverTableRow';

const styles = theme => ({});

class ExpenseTable extends React.Component {

  render() {    
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.expenses.map(expense => (
            <HoverTableRow key={expense.id}>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell component="th" scope="row">{expense.category.name}</TableCell>
              <TableCell align="right">
                <Link to={"/expenses/" + expense.id}>{expense.amount}</Link>
              </TableCell>
            </HoverTableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

ExpenseTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpenseTable);