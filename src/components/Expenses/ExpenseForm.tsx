import React, { MouseEvent, FormEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  Paper,
  TextField,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Input,
  InputAdornment,
  FormControl,
  WithStyles,
  Theme
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";

import { createExpense, updateExpense } from "../../actions/expenseActions";
import { Expense, ExpenseFormState } from "../../interfaces/expenseInterfaces";

const styles = (theme: Theme) => ({
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
      minWidth: "550px"
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
  categoryChild: {},
  buttons: {
    gridColumn: "1 / 2",
    justifySelf: "center"
  },
  button: {
    margin: "0 0.5rem"
  },
  input: {}
});

interface PassedProps extends WithStyles<typeof styles> {
  expense: Expense | null;
  history: any;
  categories: any;
  createExpense: (newExpense: ExpenseFormState) => any;
  updateExpense: (updatedExpense: ExpenseFormState) => any;
}

interface TheState {
  mode: string;
  form: ExpenseFormState;
  history: any;
  redirect?: string;
}

class ExpenseForm extends React.Component<
  PassedProps & RouteComponentProps,
  TheState
> {
  constructor(props: PassedProps & RouteComponentProps) {
    super(props);
    if (props.expense) {
      this.state = {
        mode: "edit",
        form: {
          ...props.expense,
          category: props.expense.category_id,
          date: props.expense.date
        },
        history: props.history
      };
    } else {
      this.state = {
        mode: "new",
        form: {
          description: "",
          amount: 0,
          date: this.convertDateToString(new Date()),
          category: props.categories[0].id || null
        },
        history: props.history
      };
    }
  }

  convertDateToString = (date: Date) => {
    let month: string | number = date.getMonth() + 1;
    month = month.toString().length === 1 ? "0" + month : month;
    let day: string | number = date.getDate();
    day = day.toString().length === 1 ? "0" + day : day;
    return `${date.getFullYear()}-${month}-${day}`;
  };

  categoriesList = () => {
    return this.props.categories.map((category: any, index: number) => {
      return (
        <MenuItem key={index} value={category.id}>
          {category.name}
        </MenuItem>
      );
    });
  };

  createExpense = (newExpense: ExpenseFormState) => {
    this.props.createExpense(newExpense);
    this.setState({ redirect: "/" });
  };

  updateExpense = (expense: ExpenseFormState) => {
    this.props.updateExpense(expense);
    this.setState({ redirect: `/expenses/${expense.id}` });
  };

  redirect = () => {
    const { redirect } = this.state;
    if (!!redirect) {
      return <Redirect to={redirect} />;
    }
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (this.state.mode === "edit") {
      this.updateExpense(this.state.form);
    } else {
      this.createExpense(this.state.form);
    }
  };

  handleCancel = (event: MouseEvent) => {
    this.state.history.goBack();
  };

  handleChange = (event: any) => {
    const field = event.target.id;
    this.setState({
      form: {
        ...this.state.form,
        [field]: event.target.value
      }
    });
  };

  handleCategoryChange = (event: any) => {
    this.setState({
      form: {
        ...this.state.form,
        category: event.target.value
      }
    });
  };

  render() {
    const classes = this.props.classes;

    const header = () => {
      const title = this.state.mode === "edit" ? "Edit Expense" : "New Expense";
      return (
        <Typography variant="h5" component="h3">
          {title}
        </Typography>
      );
    };

    return (
      <Paper className={classes.paper}>
        {this.redirect()}
        {header()}
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField
            id="date"
            value={this.state.form.date}
            type="date"
            label="Date"
            onChange={this.handleChange}
          />

          <TextField
            id="description"
            type="text"
            value={this.state.form.description}
            className={classes.input}
            onChange={this.handleChange}
            label="Description"
          />

          <FormControl fullWidth className={classes.input} variant="standard">
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <Input
              id="amount"
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={this.state.form.amount}
              onChange={this.handleChange}
              onFocus={event => event.target.select()}
            ></Input>
          </FormControl>

          <div className={classes.categoryGroup}>
            <InputLabel className={classes.categoryChild}>Category</InputLabel>
            <Select
              value={this.state.form.category}
              onChange={this.handleCategoryChange}
              className={classes.categoryChild}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.categoriesList()}
            </Select>
          </div>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCancel}
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
              className={classes.button}
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      createExpense,
      updateExpense
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ExpenseForm)));
