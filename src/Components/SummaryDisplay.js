import React from 'react';

export default class SummaryDisplay extends React.Component {

  render() {
    const expenses = this.props.state.expenses.map((expense, index) => {
      return <li key={index}>
        {this.props.state.expenseCategoriesMap[expense.category]}, {expense.amount}, {expense.description}
      </li>
    });

    const categories = this.props.state.expenseCategories.map((category, index) => {
      return <li key={index}>
        {category.id} - {category.name}
      </li>
    });
    
    return (
      <div className="summary">
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
      </div>
    );
  }
}