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
    this.props.expenses.sort((a,b) => {
      return new Date(b.date) - new Date(a.date);
    });
    
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
          {this.props.expenses.map(row => (
            <HoverTableRow key={row.id}>
              <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell component="th" scope="row">{row.categoryName}</TableCell>
              <TableCell align="right">
                <Link to={"/expenses/" + row.id}>{row.amount}</Link>
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