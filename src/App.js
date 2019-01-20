import React, { Component } from 'react';
import ExpenseInput from './Components/ExpenseInput';
import SummaryDisplay from './Components/SummaryDisplay';
import EditCategories from './Components/EditCategories';
import BackendCallout from './Components/BackendCallout';
import './App.css';

class App extends Component {

  state = {
    mode: 'summary',
    showExpenseInput: false,
    expenses: [],
    expenseCategories: [],
    expenseCategoriesMap: {}
  };

  componentDidMount() {
    BackendCallout.getFromApi('/api/v1/categories')
      .then(categories => {
        const expenseCategoriesMap = categories.rows.reduce((accum,category) => {
          if(!accum[category.id]) {
            accum[category.id] = category.name;
          }
          return accum;
        },{});
        this.setState({
          expenseCategories: categories.rows,
          expenseCategoriesMap
        });
      })
      .then(
        BackendCallout.getFromApi('/api/v1/expenses')
          .then(data => this.setState({expenses: data.rows}))
          .catch(error => console.log(error))
      )
      .catch(error => console.log(error));
  }

  expenseForm = () => {
    if (this.state.showExpenseInput) {
      return (
        <ExpenseInput 
          expenseCategories={this.state.expenseCategories}
          createExpense={this.createExpense}/>
      )
    } else {
      return null;
    }
  }

  mainContainer = () => {
    switch (this.state.mode) {
      case 'summary':
        return <SummaryDisplay state={this.state}/>;
      case 'edit_categories':
        return <EditCategories state={this.state}/>;
      default:
        return null;
    }
  }

  navigationMenu = () => {
    return (
      <div className='navigationMenu'>
        <button onClick={this.handleAddExpenseClick}>Add Expense</button>
        <button onClick={this.handleEditCategoriesClick}>Edit Category</button>
        <button onClick={this.handleSummaryClick}>Summary View</button>
      </div>
    );
  }

  handleAddExpenseClick = (event) => {
    this.setState((state) => {
      return {showExpenseInput: true};
    });
  }

  handleEditCategoriesClick = (event) => {
    this.setState((state) => {
      return {mode: 'edit_categories'};
    })
  }

  handleSummaryClick = (event) => {
    this.setState((state) => {return {mode: 'summary'}});
  }

  createExpense = (newExpense) => {
    BackendCallout.postToApi('/api/v1/expenses', newExpense)
      .then((responseExpense) => {
        this.setState(() => {
          return {
            showExpenseInput: false,
            expenses: [...this.state.expenses, responseExpense]
          }
        });
      })
  }
  
  render() {
    return (
      <div className="oozetracker2">
        {this.mainContainer()}
        {this.expenseForm()}

        {this.navigationMenu()}

      </div>
    );
  }
}

export default App;
