import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
  FormControl
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Redirect, withRouter } from "react-router-dom";

import { createExpense, updateExpense } from "../../actions/expenseActions";

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.expense) {
      this.state = {
        mode: "edit",
        form: {
          ...props.expense,
          category: props.expense.category_id,
          date: this.convertDateToString(new Date(props.expense.date))
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
          category: "choose one"
        },
        history: props.history
      };
    }
  }

  convertDateToString = date => {
    let month = date.getMonth() + 1;
    month = month.toString().length === 1 ? "0" + month : month;
    let day = date.getDate();
    day = day.toString().length === 1 ? "0" + day : day;
    return `${date.getFullYear()}-${month}-${day}`;
  };

  categoriesList = () => {
    return this.props.categories.map((category, index) => {
      return (
        <MenuItem key={index} value={category.id}>
          {category.name}
        </MenuItem>
      );
    });
  };

  createExpense = newExpense => {
    this.props.createExpense(newExpense);
    this.setState({ redirect: "/" });
  };

  updateExpense = expense => {
    this.props.updateExpense(expense);
    this.setState({ redirect: `/expenses/${expense.id}` });
  };

  redirect = () => {
    const { redirect } = this.state;
    if (!!redirect) {
      return <Redirect to={redirect} />;
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.mode === "edit") {
      this.updateExpense(this.state.form);
    } else {
      this.createExpense(this.state.form);
    }
  };

  handleCancel = event => {
    this.state.history.goBack();
  };

  handleChange = event => {
    const field = event.target.id;
    this.setState({
      form: {
        ...this.state.form,
        [field]: event.target.value
      }
    });
  };

  handleCategoryChange = event => {
    this.setState({
      form: {
        ...this.state.form,
        category: event.target.value
      }
    });
  };

  render() {
    const header = () => {
      const title = this.state.mode === "edit" ? "Edit Expense" : "New Expense";
      return (
        <Typography variant="h5" component="h3">
          {title}
        </Typography>
      );
    };

    return (
      <Paper className={this.props.classes.paper}>
        {this.redirect()}
        {header()}
        <form onSubmit={this.handleSubmit} className={this.props.classes.form}>
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
            className={this.props.classes.input}
            onChange={this.handleChange}
            label="Description"
          />

          <FormControl
            fullWidth
            className={this.props.classes.input}
            variant="standard"
          >
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

          <div className={this.props.classes.categoryGroup}>
            <InputLabel className={this.props.classes.categoryChild}>
              Category
            </InputLabel>
            <Select
              value={this.state.form.category}
              onChange={this.handleCategoryChange}
              className={this.props.classes.categoryChild}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.categoriesList()}
            </Select>
          </div>
          <div className={this.props.classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCancel}
              className={this.props.classes.button}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
              className={this.props.classes.button}
            >
              Submit
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
      createExpense,
      updateExpense
    },
    dispatch
  );
};

const styles = theme => ({
  form: {
    display: "grid",
    gridRowGap: "1rem",
    paddingTop: "1rem"
  },
  paper: {
    gridColumnStart: 2,
    gridColumnEnd: 4,
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
  categoryChild: {},
  buttons: {
    gridColumn: "1 / 2",
    justifySelf: "center"
  },
  button: {
    margin: "0 0.5rem"
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ExpenseForm)));
