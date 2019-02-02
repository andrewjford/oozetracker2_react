import React from 'react';
import BackendCallout from './BackendCallout';

export default class ExpenseInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.recordId,
      description: '',
      amount: 0,
      date: '',
      category: ''
    };
  }

  componentDidMount() {
    BackendCallout.getFromApi('/api/v1/expenses/' + this.state.id)
      .then(expense => {
        this.setState({...expense});
      })
      .catch(error => console.log(error));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // this.props.createExpense(this.state);
  }

  handleAmountChange = (text) => {
    this.setState({amount: text});
  }

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  }

  handleAmountChange = (event) => {
    this.setState({amount: event.target.value});
  }

  handleCategoryChange = (event) => {
    this.setState({category: event.target.value});
  }

  render() {
    return (
      <article>
        <label>
          Description
          <input type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
        </label>

        <label>
          Amount
          <input type="number" value={this.state.amount} onChange={this.handleAmountChange}/>
        </label>

        <label>
          Category
          <select onChange={this.handleCategoryChange}>
            {this.state.category}
          </select>
        </label>
      </article>
    )
  }
}
