import React from 'react';

export default class ExpenseInput extends React.Component {

  constructor(props) {
    super(props);
    let theDate = new Date();
    theDate = `${theDate.getFullYear()}-${theDate.getMonth()+1}-${theDate.getDate()}`
    this.state = {
      description: '',
      amount: 0,
      date: theDate,
      category: this.props.expenseCategories[0].id
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createExpense(this.state);
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
    const categories = this.props.expenseCategories.map(category => {
      return (
        <option key={category.id} value={category.id}>{category.name}</option>
      );
    });
    return (
      <form onSubmit={this.handleSubmit}>
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
            {categories}
          </select>
        </label>


        {/* <TextInput
          style={{height: 40, width: 100, backgroundColor: "white"}}
          keyboardType="numeric"
          onChangeText={this.handleAmountChange}
          placeholder="Amount"
        />

        <Picker selectedValue={this.state.category}
          style={{height: 40, width: '100%'}}
          onValueChange={this.handleCategoryChange}>
          {this.categories}
        </Picker> */}

        <button>Submit</button>
      </form>
    )
  }
}
