import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Redirect, withRouter } from "react-router-dom";

import ErrorDisplay from "../ErrorDisplay";
import { updateAccount } from "../../actions/accountActions";

const styles = theme => ({
  form: {
    display: "grid",
    gridRowGap: "1rem",
    paddingTop: "1rem"
  },
  paper: {
    gridColumnStart: 1,
    gridColumnEnd: -1,
    padding: "2rem",
    [theme.breakpoints.down("sm")]: {
      gridColumn: "2 / 5"
    },
    [theme.breakpoints.down("xs")]: {
      gridColumn: "1 / -1"
    }
  },
  categoryGroup: {
    gridColumn: "1 / 2",
    display: "grid",
    gridTemplateColumns: "30% 70%"
  },
  buttons: {
    gridColumn: "1 / 2",
    justifySelf: "center"
  },
  button: {
    margin: "0 0.5rem"
  }
});

class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      history: props.history,
      errors: []
    };
  }

  redirect = () => {
    const { redirect } = this.state;
    if (!!redirect) {
      return <Redirect to={redirect} />;
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props
      .updateAccount(this.state.form)
      .then(result => {
        this.setState({ errors: [] });
      })
      .catch(error => {
        const parsedError = JSON.parse(error.message);
        if (!parsedError) {
          this.setState({ errors: [error.message] });
        }
        this.setState({
          errors:
            parsedError.constructor === Array ? parsedError : [parsedError]
        });
      });
  };

  handleCancel = event => {
    this.props.closeForm();
  };

  handleOldPasswordChange = event => {
    this.setState({
      form: {
        ...this.state.form,
        oldPassword: event.target.value
      }
    });
  };

  handleNewPasswordChange = event => {
    this.setState({
      form: {
        ...this.state.form,
        newPassword: event.target.value
      }
    });
  };

  handleConfirmChange = event => {
    this.setState({
      form: {
        ...this.state.form,
        confirmPassword: event.target.value
      }
    });
  };

  render() {
    const header = (
      <Typography variant="h5" component="h3">
        Change Password
      </Typography>
    );

    return (
      <Paper className={this.props.classes.paper}>
        {this.redirect()}
        {header}
        <ErrorDisplay errors={this.state.errors} />
        <form onSubmit={this.handleSubmit} className={this.props.classes.form}>
          <TextField
            type="password"
            value={this.state.form.oldPassword}
            className={this.props.classes.input}
            onChange={this.handleOldPasswordChange}
            label="Old Password"
          />

          <TextField
            type="password"
            value={this.state.form.newPassword}
            className={this.props.classes.input}
            onChange={this.handleNewPasswordChange}
            label="New Password"
          />

          <TextField
            type="password"
            value={this.state.form.confirmNewPassword}
            className={this.props.classes.input}
            onChange={this.handleConfirmChange}
            label="Confirm New Password"
          />

          <div className={this.props.classes.buttons}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
              className={this.props.classes.button}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCancel}
              className={this.props.classes.button}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAccount
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ChangePasswordForm)));
