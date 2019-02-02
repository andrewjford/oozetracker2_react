import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import HoverTableRow from './HoverTableRow';

const styles = theme => ({});

class ExpenseTable extends React.Component {

  render() {
    
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.expenses.map(row => (
            <HoverTableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.categoryName}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                <Link to={"/expenses/" + row.id}>{row.amount}</Link>
              </TableCell>
              <TableCell align="right">{row.created_date}</TableCell>
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