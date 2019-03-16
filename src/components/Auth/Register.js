import React from 'react';
import { Paper, TextField, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const styles = theme => ({
  form: {
    display: 'grid',
    gridRowGap: '1rem',
    paddingTop: '1rem',
  },
  paper: {
    gridColumnStart: 3,
    gridColumnEnd: 5,
    padding: '2rem',
    margin: '0 7rem',
  },
  categoryGroup: {
    gridColumn: '1 / 2',
    display: 'grid',
    gridTemplateColumns: '30% 70%'
  },
  categoryChild: {
    
  },
  buttons: {
    gridColumn: '1 / 2',
    justifySelf: 'center',
  },
  button: {
    margin: '0 0.5rem'
  },
  justifyCenter: {
    justifySelf: 'center',
  }
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: '',
      },
      history: props.history,
    };
  }

  convertDateToString = (date) => {
    let month = date.getMonth() + 1;
    month = month.toString().length === 1 ? "0" + month : month;
    let day = date.getDate();
    day = day.toString().length === 1 ? "0" + day : day;
    return `${date.getFullYear()}-${month}-${day}`;
  }

  login = (input) => {
    this.props.login(input);
    this.setState({redirect: "/"});
  }

  redirect = () => {
    const {redirect} = this.state;
    if (!!redirect) {
      return (<Redirect to={redirect}/>)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.login(this.state.form);
  }

  handleCancel = (event) => {
    this.state.history.goBack();
  }

  handleEmailChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        email: event.target.value
      }
    });
  }

  handlePasswordChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        password: event.target.value
      }
    });
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        {this.redirect()}
        <Typography variant="h5" component="h3">Register</Typography>
        <form onSubmit={this.handleSubmit} className={this.props.classes.form}>
          <TextField type="text" value={this.state.form.email}  className={this.props.classes.input}
                     onChange={this.handleEmailChange}
                     label="Email"/>
          
          <TextField type="password" value={this.state.form.password} onChange={this.handlePasswordChange}
                     label="Password" className={this.props.classes.input}/>

          <div className={this.props.classes.buttons}>
            <Button type="submit" variant="contained" color="secondary" 
                    onClick={this.handleSubmit} className={this.props.classes.button}>Submit</Button>
            <Button variant="contained" color="secondary" 
                    onClick={this.handleCancel} className={this.props.classes.button}>Cancel</Button>
          </div>
          <Typography variant="body2" className={this.props.classes.justifyCenter}>
            <span>Not a member? Register </span>
            <Link to="/expenses/new">
              here
            </Link>
          </Typography>
        </form>
      </Paper>
    )
  }
}

export default withRouter(withStyles(styles)(Register));
