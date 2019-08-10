import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { getMonthly, changeMonthlyView } from "../actions/expenseActions";

const styles = theme => ({
  mainHeader: {
    gridColumn: "1 / 5",
    height: "2rem",
    padding: "1rem 1rem 0"
  },
  summary: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "1rem 20% auto 20% 1rem"
  },
  paper: {
    gridColumnStart: 3,
    gridColumnEnd: 5,
    margin: "1rem 5rem"
  },
  headerItem: {
    verticalAlign: "middle",
    display: "inline"
  },
  table: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    padding: "1rem 2rem 3rem"
  },
  row1col1: {
    alignSelf: "center",
    gridColumn: "1 / 2",
    paddingBottom: "1rem"
  },
  row1col2: {
    justifySelf: "right",
    gridColumn: "2",
    paddingBottom: "1rem"
  },
  col1: {
    gridColumn: "1 / 2"
  },
  col2: {
    gridColumn: "2",
    justifySelf: "right"
  },
  buttons: {
    gridColumn: "1 / 5",
    justifySelf: "center"
  }
});

class MyAccount extends React.Component {
  componentDidMount() {
    // fetch account.name
  }

  handleChangePassword = (event) => {
    //load password change form
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <article className={this.props.classes.table}>
          <div className={this.props.classes.row1col1}>
            <Typography
              variant="h5"
              component="h3"
              className={this.props.classes.header}
            >
              My Account
            </Typography>
          </div>
          <Typography variant="subtitle1" className={this.props.classes.col1}>
            Email
          </Typography>
          <Typography variant="subtitle1" className={this.props.classes.col2}>
            Your Email Here
          </Typography>
          <Typography variant="subtitle1" className={this.props.classes.col1}>
            Name
          </Typography>
          <Typography variant="subtitle1" className={this.props.classes.col2}>
            Your Name Here
          </Typography>
          <div className={this.props.classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleChangePassword}
            >
              Change Password
            </Button>
          </div>
        </article>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    monthlyView: state.expenses.monthlies.currentView,
    monthlies: state.expenses.monthlies.monthlies
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMonthly,
      changeMonthlyView
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MyAccount));