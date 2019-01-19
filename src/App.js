import React, { Component } from 'react';
import ExpenseInput from './Components/ExpenseInput';
import './App.css';

class App extends Component {

  state = {
    mode: 'summary',
    showExpenseInput: false,
    expenses: [
      {category: 'Groceries', description: "tiger", amount: "3812.70"},
      {category: 'Apparel', description: "doggie", amount: "129.33"}
    ],
    expenseCategories: [
      'Groceries',
      'Dining Out',
      'Entertainment',
      'Transportation',
      'Apparel',
      'Health',
      'Alcohol'
    ]
  };

  componentDidMount() {
    this.getCategories()
      .then(categories => this.setState({expenseCategories: categories}))
      .catch(error => console.log(error));
  }

  getCategories = async () => {
    const response = await fetch('/api/v1/categories');
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
