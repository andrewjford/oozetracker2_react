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
  hidden: {
    visibility: 'hidden',
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
        name: '',
        email: '',
        password: '',
      },
      history: props.history,
      errors: [],
    };
  }

  convertDateToString = (date) => {
    let month = date.getMonth() + 1;
    month = month.toString().length === 1 ? "0" + month : month;
    let day = date.getDate();
    day = day.toString().length === 1 ? "0" + day : day;
    return `${date.getFullYear()}-${month}-${day}`;
  }

  register = (input) => {
    this.props.register(input)
      .then(() => {
        this.setState({redirect: "/"});
      })
      .catch(error => {
        this.setState({errors: JSON.parse(error.message)});
      });
  }

  redirect = () => {
    const {redirect} = this.state;
    if (!!redirect) {
      return (<Redirect to={redirect}/>)
    }
  }

  showError = (errorMessage) => {
    this.setState({errors: [errorMessage]});
  }

  validateInput = (form) => {
    if (form.name === "" || form.email === "" || form.pasword === "") {
      this.showError('Please complete all fields.');
      return false;
    } else {
      return true;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formIsComplete = this.validateInput(this.state.form);
    if (formIsComplete) {
      this.register(this.state.form);
    }
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

  handleNameChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        name: event.target.value,
      }
    })
  }

  displayError = () => {
    if (this.state.errors.length > 0) {
      return this.state.errors.map((error) => {
        return (<Typography key={error} variant="body1" color="error">{error}</Typography>);
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        {this.redirect()}
        <Typography variant="h5" component="h3">Register</Typography>
        <div>
          {this.displayError()}
        </div>
        <form onSubmit={this.handleSubmit} className={this.props.classes.form}>
          <TextField type="text" value={this.state.form.name} className={this.props.classes.input}
                      onChange={this.handleNameChange}
                      label="Name"/>

          <TextField type="text" value={this.state.form.email}  className={this.props.classes.input}
                     onChange={this.handleEmailChange}
                     label="Email"/>
          
          <TextField type="password" value={this.state.form.password} onChange={this.handlePasswordChange}
                     label="Password" className={this.props.classes.input}/>

          <div className={this.props.classes.buttons}>
            <Button type="submit" variant="contained" color="secondary" 
                    onClick={this.handleSubmit} className={this.props.classes.button}>Register</Button>
          </div>
          <Typography variant="body2" className={this.props.classes.justifyCenter}>
            <span>Already a member? Login </span>
            <Link to="/login">
              here
            </Link>
          </Typography>
        </form>
      </Paper>
    )
  }
}

export default withRouter(withStyles(styles)(Register));
