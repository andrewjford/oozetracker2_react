import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import BackendCallout from '../services/BackendCallout';

const styles = theme => ({
  mainHeader: {
    gridColumn: "1 / 5",
    height: "2rem",
    paddingLeft: "1rem",
    paddingTop: "1rem",
  },
  summary: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "1rem 20% auto 20% 1rem"
  },
  paper: {
    gridColumnStart: 3,
    gridColumnEnd: 4
  },
  headerItem: {
    verticalAlign: "middle",
    display: "inline",
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
    this.getMonthlyReport(currentMonthRequest);
  }

  getMonthlyReport = (requestBody) => {
    BackendCallout.postToApi('/api/v1/reports/monthly', requestBody)
      .then(report => {
        this.setState({lineItems: report.rows});
      })
      .catch(error => {
        console.log(error)
      });
  }

  handleLeftMonthClick = () => {
    const date = this.state.date;
    date.setMonth(this.state.date.getMonth() - 1);
    this.setState({date});

    const currentMonthRequest = {
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
    this.getMonthlyReport(currentMonthRequest);
  }

  handleRightMonthClick = () => {
    const date = this.state.date;
    date.setMonth(this.state.date.getMonth() + 1);
    this.setState({date});
    
    const currentMonthRequest = {
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
    this.getMonthlyReport(currentMonthRequest);
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
          <div className={this.props.classes.mainHeader}>
            <ChevronLeft className={this.props.classes.headerItem} onClick={this.handleLeftMonthClick}/>
            <Typography className={this.props.classes.headerItem} variant="h5" component="h3">
              {this.state.date.getFullYear()} {this.state.monthNames[this.state.date.getMonth()]}
            </Typography>
            <ChevronRight className={this.props.classes.headerItem} onClick={this.handleRightMonthClick}/>
          </div>

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