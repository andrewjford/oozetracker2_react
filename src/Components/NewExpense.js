import React from 'react';
import { Paper, TextField, Typography, Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import BackendCallout from './BackendCallout';

export default class NewExpense extends React.Component {

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
      <Paper>
        {this.redirect()}
        <Typography variant="h5" component="h3">
          New Expense
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField type="text" value={this.state.form.description} onChange={this.handleDescriptionChange}
                     label="Description"/>
          
          <TextField type="number" value={this.state.form.amount} onChange={this.handleAmountChange}
                     label="Amount"/>

          <InputLabel>Category</InputLabel>
            <Select value={this.state.form.category} onChange={this.handleCategoryChange}>
              <MenuItem value=""><em>None</em></MenuItem>
              {this.categoriesList()}
            </Select>

          <Button type="submit" variant="contained" color="secondary" onClick={this.handleSubmit}>Submit</Button>
        </form>
      </Paper>
    )
  }
}
