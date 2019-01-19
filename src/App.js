import React, { Component } from 'react';
import ExpenseInput from './Components/ExpenseInput';
import './App.css';

class App extends Component {

  state = {
    mode: 'summary',
    showExpenseInput: false,
    expenses: [],
    expenseCategories: []
  };

  componentDidMount() {
    this.getFromApi('/api/v1/categories')
      .then(categories => this.setState({expenseCategories: categories}))
      .catch(error => console.log(error));
    this.getFromApi('/api/v1/expenses')
      .then(data => this.setState({expenses: data.rows}))
      .catch(error => console.log(error));
  }

  getFromApi = async (url) => {
    const response = await fetch(url);
    const body = response.json();

    if(response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  expenseForm = () => {
    if (this.state.showExpenseInput) {
      return (
        <ExpenseInput 
          expenseCategories={this.state.expenseCategories}
          createExpense={this.addExpense}/>
      )
    } else {
      return null;
    }
  };

  handleAddExpenseClick = (event) => {
    this.setState((state) => {
      return {showExpenseInput: true};
    });
  };

  addExpense = (newExpense) => {
    this.setState(() => {
      return {
        showExpenseInput: false,
        expenses: [...this.state.expenses, newExpense]
      }
    });
  }
  
  render() {
    const expenses = this.state.expenses.map((expense, index) => {
      return <li key={index}>
        {expense.category}, {expense.amount}, {expense.description}
      </li>
    });
    
    return (
      <div className="oozetracker2">
        <ul>
          {expenses}
        </ul>

        {this.expenseForm()}

        <button onClick={this.handleAddExpenseClick}>Add Expense</button>

      </div>
    );
  }
}

export default App;
