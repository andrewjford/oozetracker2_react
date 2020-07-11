import React, { FormEvent, ChangeEvent } from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  Theme,
  createStyles,
  WithStyles,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorDisplay from "../ErrorDisplay";
import Loading from "../Loading";

interface PassedProps extends WithStyles<typeof styles> {
  login: (formState: LoginFormState) => any;
  isLoggedIn: boolean;
}

interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginState {
  form: LoginFormState;
  history: any;
  errors: Array<any>;
  loading: boolean;
  redirect?: string;
}

class Login extends React.Component<
  PassedProps & RouteComponentProps,
  LoginState
> {
  constructor(props: PassedProps & RouteComponentProps) {
    super(props);
    this.state = {
      form: {
        email: "",
        password: "",
        rememberMe: false,
      },
      history: props.history,
      errors: [],
      loading: false,
    };
  }

  login = (input: LoginFormState) => {
    this.setState({ loading: true });
    this.props
      .login(input)
      .then(() => {
        this.setState({
          loading: false,
          redirect: "/",
        });
      })
      .catch((error: Error) => {
        const parsedError = JSON.parse(error.message);
        if (!parsedError) {
          this.setState({ errors: [error.message] });
        }
        this.setState({
          errors:
            parsedError.constructor === Array ? parsedError : [parsedError],
          loading: false,
        });
      });
  };

  handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    this.login(this.state.form);
  };

  handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      form: {
        ...this.state.form,
        email: event.target.value,
      },
    });
  };

  handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      form: {
        ...this.state.form,
        password: event.target.value,
      },
    });
  };

  handleRememberMeChange = () => {
    this.setState({
      form: {
        ...this.state.form,
        rememberMe: !this.state.form.rememberMe,
      },
    });
  };

  loadingSpinner = () => {
    if (this.state.loading) {
      return <Loading />;
    }
  };

  loginForm = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <form onSubmit={this.handleSubmit} className={this.props.classes.form}>
          <TextField
            type="text"
            value={this.state.form.email}
            className={this.props.classes.input}
            onChange={this.handleEmailChange}
            label="Email"
          />

          <TextField
            type="password"
            value={this.state.form.password}
            onChange={this.handlePasswordChange}
            label="Password"
            className={this.props.classes.input}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.form.rememberMe}
                onChange={this.handleRememberMeChange}
              />
            }
            label={<Typography variant="body2">Remember Me</Typography>}
          />

          <div className={this.props.classes.buttons}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
              className={this.props.classes.button}
            >
              Login
            </Button>
          </div>
          <Typography
            variant="body2"
            className={this.props.classes.justifyCenter}
          >
            <span>Not a member? Register </span>
            <Link to="/register">here</Link>
          </Typography>
          <Typography
            variant="body2"
            className={this.props.classes.justifyCenter}
          >
            <span>Forgot your password? Reset </span>
            <Link to="/resetPassword">here</Link>
          </Typography>
        </form>
      );
    }
  };

  render() {
    if (this.props.isLoggedIn || this.state.redirect) {
      return <Redirect to={"/"} />;
    } else {
      return (
        <Paper className={this.props.classes.paper}>
          <Typography variant="h5" component="h3">
            Login
          </Typography>
          <ErrorDisplay errors={this.state.errors} />
          {this.loginForm()}
        </Paper>
      );
    }
  }
}

const styles = (theme: Theme) =>
  createStyles({
    form: {
      display: "grid",
      gridRowGap: "1rem",
      paddingTop: "1rem",
    },
    paper: {
      gridColumnStart: 3,
      gridColumnEnd: 5,
      padding: "2rem",
      minHeight: "15rem",
      [theme.breakpoints.up("md")]: {
        justifySelf: "center",
        minWidth: "500px",
        maxWidth: "500px",
      },
      [theme.breakpoints.down("sm")]: {
        gridColumn: "3 / 5",
      },
      [theme.breakpoints.down("xs")]: {
        gridColumn: "1 / -1",
      },
    },
    categoryGroup: {
      gridColumn: "1 / 2",
      display: "grid",
      gridTemplateColumns: "30% 70%",
    },
    categoryChild: {},
    buttons: {
      gridColumn: "1 / 2",
      justifySelf: "center",
    },
    button: {
      margin: "0 0.5rem",
    },
    justifyCenter: {
      justifySelf: "center",
    },
    input: {},
  });

export default withStyles(styles)(withRouter(Login));
