import React from 'react';
import { Paper, TextField, Typography, Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import BackendCallout from './BackendCallout';

const styles = theme => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '30% 30% auto',
    gridRowGap: '1rem'
  },
  container: {
    padding: '2rem'
  },
  input: {
    gridColumn: '1 / 2'
  },
  categoryGroup: {
    gridColumn: '1 / 2',
    display: 'grid',
    gridTemplateColumns: '30% 70%'
  },
  categoryChild: {
    
  },
  button: {
    gridColumn: '1 / 2',
    justifySelf: 'center'
  }
});

class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    let theDate = new Date();
    theDate = `${theDate.getFullYear()}-${theDate.getMonth()+1}-${theDate.getDate()}`
    this.state = {
      form: {
        description: '',
        amount: 0,
        date: theDate,
        category: 'wut',
      },
      categories: props.expenseCategories
    };
  }

  categoriesList = () => {
    return this.state.categories.map((category, index) => {
      return (<MenuItem key={index} value={category.id}>{category.name}</MenuItem>);
    });
  }

  createExpense = (newExpense) => {
    BackendCallout.postToApi('/api/v1/expenses', newExpense)
      .then((responseExpense) => {
        this.props.addNewExpense(responseExpense);
      });
  }

  redirect = () => {
    const {redirect} = this.state;
    if (!!redirect) {
      return (<Redirect to={redirect}/>)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.createExpense(this.state.form);
  }

  handleAmountChange = (text) => {
    this.setState({amount: text});
  }

  handleDescriptionChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        description: event.target.value
      }
    });
  }

  handleAmountChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        amount: event.target.value
      }
    });
  }

  handleCategoryChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        category: event.target.value
      }
    });
  }

  render() {
    return (
      <Paper className={this.props.classes.container}>
        {this.redirect()}
        <Typography variant="h5" component="h3">
          New Expense
        </Typography>
        <form onSubmit={this.handleSubmit} className={this.props.classes.form}>
          <TextField type="text" value={this.state.form.description}  className={this.props.classes.input}
                     onChange={this.handleDescriptionChange}
                     label="Description"/>
          
          <TextField type="number" value={this.state.form.amount} onChange={this.handleAmountChange}
                     label="Amount" className={this.props.classes.input}/>

          <div className={this.props.classes.categoryGroup}>
            <InputLabel className={this.props.classes.categoryChild}>Category</InputLabel>
            <Select value={this.state.form.category} onChange={this.handleCategoryChange} className={this.props.classes.categoryChild}>
              <MenuItem value=""><em>None</em></MenuItem>
              {this.categoriesList()}
            </Select>
          </div>

          <Button type="submit" variant="contained" color="secondary" 
                  onClick={this.handleSubmit} className={this.props.classes.button}>Submit</Button>
        </form>
      </Paper>
    )
  }
}

export default withStyles(styles)(NewExpense);
