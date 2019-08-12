import React from 'react';
import { Paper, TextField, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ErrorDisplay from '../ErrorDisplay';
import Loading from '../Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: '',
      },
      history: props.history,
      errors: [],
      loading: false,
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
    this.setState({loading: true});
    this.props.login(input)
      .then(() => {
        debugger
        this.setState({
          loading: false,
          redirect: "/",
        });
      })
      .catch(error => {
        const parsedError = JSON.parse(error.message);
        if (!parsedError) {
          this.setState({errors: [error.message]});
        }
        this.setState({
          errors: parsedError.constructor === Array ? parsedError : [parsedError],
          loading: false,
        });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.login(this.state.form);
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

  loadingSpinner = () => {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  loginForm = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <form onSubmit={this.handleSubmit} className={this.props.classes.form}>
          <TextField type="text" value={this.state.form.email}  className={this.props.classes.input}
                      onChange={this.handleEmailChange}
                      label="Email"/>
          
          <TextField type="password" value={this.state.form.password} onChange={this.handlePasswordChange}
                      label="Password" className={this.props.classes.input}/>

          <div className={this.props.classes.buttons}>
            <Button type="submit" variant="contained" color="secondary" 
                    onClick={this.handleSubmit} className={this.props.classes.button}>Login</Button>
          </div>
          <Typography variant="body2" className={this.props.classes.justifyCenter}>
            <span>Not a member? Register </span>
            <Link to="/register">
              here
            </Link>
          </Typography>
        </form>
      );
    }
  };

  render() {
    if (this.props.isLoggedIn || this.state.redirect) {
      return <Redirect to={'/'} />;
    } else {
      return (
        <Paper className={this.props.classes.paper}>
          <Typography variant="h5" component="h3">Login</Typography>
          <ErrorDisplay errors={this.state.errors} />
          {this.loginForm()}
        </Paper>
      );
    }
  }
}

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
    minHeight: '15rem',
    [theme.breakpoints.down('sm')]: {
      gridColumn: "2 / 6",
    },
    [theme.breakpoints.down('xs')]: {
      gridColumn: "1 / -1",
    },
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

export default withRouter(withStyles(styles)(Login));
