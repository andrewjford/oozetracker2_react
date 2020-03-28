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
import { Autocomplete } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";

import {
  createExpense,
  updateExpense,
  getExpenseSuggestions
} from "../../actions/expenseActions";
import { Expense, ExpenseFormState } from "../../interfaces/expenseInterfaces";
import ErrorDisplay from "../ErrorDisplay";

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
  suggestions: {
    topDescriptions: any;
    categoryToDescription: any;
  };
  createExpense: (newExpense: ExpenseFormState) => any;
  updateExpense: (updatedExpense: ExpenseFormState) => any;
  getExpenseSuggestions: () => any;
}

interface TheState {
  mode: string;
  form: ExpenseFormState;
  history: any;
  errors: any[];
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
        history: props.history,
        errors: []
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
        history: props.history,
        errors: []
      };
    }
  }

  componentDidMount() {
    if (Object.keys(this.props.suggestions.topDescriptions).length === 0) {
      this.props.getExpenseSuggestions();
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
    return this.props
      .createExpense(newExpense)
      .then(() => {
        this.props.history.push("/");
      })
      .catch((err: Error) => {
        this.setState({
          errors: [err.message]
        });
      });
  };

  updateExpense = async (expense: ExpenseFormState) => {
    try {
      await this.props.updateExpense(expense);
      this.props.history.push(`/expenses/${expense.id}`);
    } catch (err) {
      this.setState({
        errors: [err.message]
      });
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

  handleDescriptionChange = (event: any, value: any) => {
    this.setState({
      form: {
        ...this.state.form,
        description: value
      }
    });

    this.autoChangeCategory(value);
  };

  handleCategoryChange = (event: any) => {
    // change description suggestions

    this.setState({
      form: {
        ...this.state.form,
        category: event.target.value
      }
    });
  };

  autoChangeCategory = (description: string) => {
    const relatedSuggestion = this.props.suggestions.topDescriptions[
      description
    ];

    if (
      relatedSuggestion &&
      this.state.form.description !== description &&
      this.state.mode === "new"
    ) {
      this.setState({
        form: {
          ...this.state.form,
          description,
          category: relatedSuggestion.category_id
        }
      });
    }
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

    const descriptionSuggestions: string[] = Object.keys(
      this.props.suggestions.topDescriptions
    );

    descriptionSuggestions.push(this.state.form.description);

    return (
      <Paper className={classes.paper}>
        {header()}
        <ErrorDisplay errors={this.state.errors} />
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField
            id="date"
            value={this.state.form.date}
            type="date"
            label="Date"
            onChange={this.handleChange}
          />

          <Autocomplete
            freeSolo
            options={descriptionSuggestions}
            value={this.state.form.description}
            onChange={this.handleDescriptionChange}
            autoSelect={true}
            renderInput={params => (
              <TextField
                {...params}
                type="text"
                className={classes.input}
                label="Description"
              />
            )}
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

const mapStateToProps = (state: {
  expenses: {
    suggestions: any;
  };
}) => {
  return {
    suggestions: state.expenses.suggestions
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      createExpense,
      updateExpense,
      getExpenseSuggestions
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ExpenseForm)));
