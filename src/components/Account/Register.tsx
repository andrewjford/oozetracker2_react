import React, { FormEvent, ChangeEvent } from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  WithStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorDisplay from "../ErrorDisplay";

interface PassedProps extends WithStyles<typeof styles> {
  register: (form: RegisterFormState) => any;
}

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
}

interface RegisterState {
  form: RegisterFormState;
  history: any;
  errors: Array<any>;
  redirect?: string;
}

class Register extends React.Component<
  PassedProps & RouteComponentProps,
  RegisterState
> {
  constructor(props: PassedProps & RouteComponentProps) {
    super(props);
    this.state = {
      form: {
        name: "",
        email: "",
        password: ""
      },
      history: props.history,
      errors: []
    };
  }

  register = (input: RegisterFormState) => {
    this.props
      .register(input)
      .then(() => {
        this.setState({ redirect: "/pleaseverify" });
      })
      .catch((error: Error) => {
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

  redirect = () => {
    const { redirect } = this.state;
    if (!!redirect) {
      return <Redirect to={redirect} />;
    }
  };

  showError = (errorMessage: string) => {
    this.setState({ errors: [errorMessage] });
  };

  validateInput = (form: RegisterFormState) => {
    if (form.name === "" || form.email === "" || form.password === "") {
      this.showError("Please complete all fields.");
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    const formIsComplete = this.validateInput(this.state.form);
    if (formIsComplete) {
      this.register(this.state.form);
    }
  };

  handleCancel = (event: ChangeEvent<HTMLInputElement>) => {
    this.state.history.goBack();
  };

  handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      form: {
        ...this.state.form,
        email: event.target.value
      }
    });
  };

  handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      form: {
        ...this.state.form,
        password: event.target.value
      }
    });
  };

  handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      form: {
        ...this.state.form,
        name: event.target.value
      }
    });
  };

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        {this.redirect()}
        <Typography variant="h5" component="h3">
          Register
        </Typography>
        <ErrorDisplay errors={this.state.errors} />

        <form onSubmit={this.handleSubmit} className={this.props.classes.form}>
          <TextField
            type="text"
            value={this.state.form.name}
            className={this.props.classes.input}
            onChange={this.handleNameChange}
            label="Name"
          />

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

          <div className={this.props.classes.buttons}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
              className={this.props.classes.button}
            >
              Register
            </Button>
          </div>
          <Typography
            variant="body2"
            className={this.props.classes.justifyCenter}
          >
            <span>Already a member? Login </span>
            <Link to="/login">here</Link>
          </Typography>
        </form>
      </Paper>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    form: {
      display: "grid",
      gridRowGap: "1rem",
      paddingTop: "1rem"
    },
    paper: {
      gridColumnStart: 3,
      gridColumnEnd: 5,
      padding: "2rem",
      [theme.breakpoints.up("md")]: {
        justifySelf: "center",
        minWidth: "500px",
        maxWidth: "500px"
      },
      [theme.breakpoints.down("sm")]: {
        gridColumn: "3 / 5"
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
    hidden: {
      visibility: "hidden"
    },
    buttons: {
      gridColumn: "1 / 2",
      justifySelf: "center"
    },
    button: {
      margin: "0 0.5rem"
    },
    justifyCenter: {
      justifySelf: "center"
    },
    input: {}
  });

export default withRouter(withStyles(styles)(Register));
