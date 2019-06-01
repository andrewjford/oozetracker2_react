import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const styles = theme => ({
  paper: {
    gridColumnStart: 3,
    gridColumnEnd: 5,
    padding: '2rem',
    margin: '0 7rem',
  },
  login: {
    justifySelf: 'center',
    paddingTop: '1rem',
  }
});

class UnverifiedEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: '',
    };
  }

  redirect = () => {
    const {redirect} = this.state;
    if (!!redirect) {
      return (<Redirect to={redirect}/>)
    }
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        {this.redirect()}
        <Typography variant="body1">An email has been sent to your provided email. Please click the link in the email to verify your email address.</Typography>

        <Typography variant="body2" className={this.props.classes.login}>
          <span>Already verified? Login </span>
          <Link to="/login">
            here
          </Link>
          .
        </Typography>

        <Typography variant="body2" className={this.props.classes.login}>
          <span>Nah, let's just </span>
          <Link to="/">
            go now
          </Link>
          .
        </Typography>
      </Paper>
    )
  }
}

export default withRouter(withStyles(styles)(UnverifiedEmail));
