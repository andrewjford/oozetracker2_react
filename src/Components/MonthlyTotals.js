import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import BackendCallout from './BackendCallout';

const styles = theme => ({
  mainHeader: {
    padding: "1rem 1rem 0"
  },
  summary: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "1rem 20% auto 20% 1rem"
  },
  paper: {
    gridColumnStart: 3,
    gridColumnEnd: 4
  }
});

class MonthlyTotals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesMap: props.categoriesMap,
      lineItems: [],
      date: new Date(),
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
    };
  }
  componentDidMount() {
    const currentMonthRequest = {
      month: this.state.date.getMonth() + 1,
      year: this.state.date.getFullYear()
    };
    BackendCallout.postToApi('/api/v1/reports/monthly', currentMonthRequest)
      .then(report => {
        this.setState({lineItems: report.rows});
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    const lineItems = this.state.lineItems.map((lineItem) => {
      return (
        <TableRow key={lineItem.id}>
          <TableCell>{this.state.categoriesMap[lineItem.id]}</TableCell>
          <TableCell align="right">{lineItem.sum}</TableCell>
        </TableRow>
      );
    });

    const total = this.state.lineItems.reduce((accum, lineItem) => {
      return accum + parseFloat(lineItem.sum);
    },0);
    
    return (
      <div className={this.props.classes.summary}>
        <Paper className={this.props.classes.paper}>
          <Typography className={this.props.classes.mainHeader} variant="h5" component="h3">
            {this.state.date.getFullYear()} {this.state.monthNames[this.state.date.getMonth()]}
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {lineItems}
              <TableRow>
                <TableCell><b>Total</b></TableCell>
                <TableCell align="right"><b>{total}</b></TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MonthlyTotals);