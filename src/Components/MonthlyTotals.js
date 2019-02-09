import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import BackendCallout from './BackendCallout';

const styles = theme => ({
  mainHeader: {
    padding: "1rem 1rem 0"
  },
  summary: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "40px 50px auto 50px 40px"
  },
  paper: {
    gridColumnStart: 2,
    gridColumnEnd: 5
  }
});

class MonthlyTotals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineItems: [],
    };
  }
  componentDidMount() {
    const today = new Date();
    const currentMonthRequest = {
      month: today.getMonth() + 1,
      year: today.getFullYear()
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
        <li>
          <span>{lineItem.id}</span>
          <span>{lineItem.sum}</span>
        </li>
      );
    });
    
    return (
      <div className={this.props.classes.summary}>
        <Paper className={this.props.classes.paper}>
          <Typography className={this.props.classes.mainHeader} variant="h5" component="h3">
            Monthly Summary
          </Typography>
          <ul>
            {lineItems}
          </ul>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MonthlyTotals);