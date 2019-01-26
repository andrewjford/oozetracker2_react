import React from 'react';

import ExpenseTable from './ExpenseTable';

export default class SummaryDisplay extends React.Component {

  render() {
    const expenses = this.props.state.expenses.map((expense) => {
      return {
        ...expense,
        categoryName: this.props.state.expenseCategoriesMap[expense.category]
      }
    });
    
    return (
      <div className="summary">
        <h2>Expenses</h2>
        <ExpenseTable expenses={expenses}/>
      </div>
    );
  }
}