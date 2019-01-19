import React, { Component } from 'react';
import ExpenseInput from './Components/ExpenseInput';
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
    this.getFromApi('/api/v1/categories')
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
        this.getFromApi('/api/v1/expenses')
          .then(data => this.setState({expenses: data.rows}))
          .catch(error => console.log(error))
      )
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
        {this.state.expenseCategoriesMap[expense.category]}, {expense.amount}, {expense.description}
      </li>
    });

    const categories = this.state.expenseCategories.map((category, index) => {
      return <li key={index}>
        {category.id} - {category.name}
      </li>
    });
    
    return (
      <div className="oozetracker2">
        <div>
          <h2>Categories</h2>
          <ul>
            {categories}
          </ul>
        </div>
        <div>
          <h2>Expenses</h2>
          <ul>
            {expenses}
          </ul>
        </div>

        {this.expenseForm()}

        <button onClick={this.handleAddExpenseClick}>Add Expense</button>

      </div>
    );
  }
}

export default App;
